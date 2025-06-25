import { join } from "path";
import { readdir, readFile, mkdir } from "fs/promises";
import { Connection, createConnection } from "mysql2/promise";
import { existsSync } from "fs";

const MIGRATIONS_DIR = "./src/core/db/migrations";

interface MigrationRecord {
  id: number;
  name: string;
  filename: string;
  applied_at: Date;
}

interface QueryObject {
  text: string;
  args?: any[];
}

export class Migrator {
  private connection: Connection;
  private initialized = false;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /**
   * Initialize the migration system and run pending migrations
   */
  async initialize(): Promise<void> {
    console.log("Checking database migrations...");

    // Make sure migration table exists
    await this.createMigrationTableIfNotExists();
    this.initialized = true;

    // Check and apply migrations
    await this.applyPendingMigrations();
  }

  /**
   * Creates the migrations table if it doesn't exist
   */
  private async createMigrationTableIfNotExists(): Promise<void> {
    await this.connection.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  /**
   * Load all migration files from the migrations directory
   */
  private async loadMigrationFiles(): Promise<string[]> {
    try {
      if (!existsSync(MIGRATIONS_DIR)) {
        console.log(
          `Migrations directory not found. Creating ${MIGRATIONS_DIR}...`
        );
        await mkdir(MIGRATIONS_DIR, { recursive: true });
        return [];
      }

      const entries = await readdir(MIGRATIONS_DIR, { withFileTypes: true });
      const files = entries
        .filter(entry => entry.isFile() && entry.name.match(/^\d+_.*\.(sql|js|ts)$/))
        .map(entry => entry.name);

      // Sort files by their numeric prefix
      return files.sort((a, b) => {
        const numA = parseInt(a.split("_")[0]);
        const numB = parseInt(b.split("_")[0]);
        return numA - numB;
      });
    } catch (error) {
      console.error("Error loading migration files:", error);
      throw error;
    }
  }

  /**
   * Get list of already applied migrations
   */
  private async getAppliedMigrations(): Promise<MigrationRecord[]> {
    const [rows] = await this.connection.execute<any[]>(
      "SELECT id, name, filename, applied_at FROM migrations ORDER BY id"
    );
    return rows as MigrationRecord[];
  }

  /**
   * Check for pending migrations and apply them
   */
  private async applyPendingMigrations(): Promise<void> {
    if (!this.initialized) {
      throw new Error("Migration system not initialized");
    }

    // Get list of all migrations
    const migrationFiles = await this.loadMigrationFiles();

    // Get already applied migrations
    const appliedMigrations = await this.getAppliedMigrations();
    const appliedFilenames = new Set(appliedMigrations.map((m) => m.filename));

    // Find migrations that haven't been applied yet
    const pendingMigrations = migrationFiles.filter(
      (file) => !appliedFilenames.has(file)
    );

    if (pendingMigrations.length === 0) {
      console.log("No pending migrations to apply.");
      return;
    }

    console.log(
      `Found ${pendingMigrations.length} pending migrations to apply...`
    );

    // Apply each pending migration
    for (const filename of pendingMigrations) {
      await this.applyMigration(filename);
    }

    console.log("All migrations applied successfully.");
  }

  /**
   * Apply a single migration file
   */
  private async applyMigration(filename: string): Promise<void> {
    console.log(`Applying migration: ${filename}`);

    const filepath = join(MIGRATIONS_DIR, filename);

    try {
      // Handle different file types
      if (filename.endsWith(".sql")) {
        await this.applySqlMigration(filepath, filename);
      } else if (filename.endsWith(".js") || filename.endsWith(".ts")) {
        await this.applyJsTsMigration(filepath, filename);
      } else {
        throw new Error(`Unsupported migration file type: ${filename}`);
      }

      // Record the migration as applied
      const name = filename
        .split("_")
        .slice(1)
        .join("_")
        .replace(/\.(sql|js|ts)$/, "");
      await this.recordAppliedMigration(name, filename);

      console.log(`Successfully applied migration: ${filename}`);
    } catch (error) {
      console.error(`Failed to apply migration ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Apply a SQL migration file
   */
  private async applySqlMigration(
    filepath: string,
    filename: string
  ): Promise<void> {
    const sql = await readFile(filepath, 'utf-8');

    // Check if transaction should be disabled
    const disableTransaction = sql
      .trim()
      .startsWith("-- migrate disableTransaction");

    if (disableTransaction) {
      // Run without transaction - split by semicolons and execute each statement
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
      
      for (const statement of statements) {
        await this.connection.execute(statement);
      }
    } else {
      // Run within transaction
      await this.connection.beginTransaction();

      try {
        // Split by semicolons and execute each statement
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));
        
        for (const statement of statements) {
          await this.connection.execute(statement);
        }
        
        await this.connection.commit();
      } catch (error) {
        await this.connection.rollback();
        throw error;
      }
    }
  }

  /**
   * Apply a JavaScript/TypeScript migration file
   */
  private async applyJsTsMigration(
    filepath: string,
    filename: string
  ): Promise<void> {
    // For TypeScript files, we need to use require or dynamic import
    // This assumes the TypeScript files are compiled to JavaScript
    const absolutePath = join(process.cwd(), filepath.replace('.ts', '.js'));
    
    let migration: any;
    try {
      // Use dynamic import for ES modules
      migration = await import(`file://${absolutePath}`);
    } catch (error) {
      // Fallback to require for CommonJS
      delete require.cache[require.resolve(absolutePath)];
      migration = require(absolutePath);
    }

    if (typeof migration.generateQueries !== "function") {
      throw new Error(
        `Migration file ${filename} does not export generateQueries function`
      );
    }

    const queries = migration.generateQueries();
    const disableTransaction = migration.disableTransaction === true;

    if (disableTransaction) {
      // Run without transaction
      for (const query of queries) {
        if (typeof query === "string") {
          await this.connection.execute(query);
        } else {
          await this.connection.execute(query.text, query.args || []);
        }
      }
    } else {
      // Run within transaction
      await this.connection.beginTransaction();

      try {
        for (const query of queries) {
          if (typeof query === "string") {
            await this.connection.execute(query);
          } else {
            await this.connection.execute(query.text, query.args || []);
          }
        }
        await this.connection.commit();
      } catch (error) {
        await this.connection.rollback();
        throw error;
      }
    }
  }

  /**
   * Record a migration as having been applied
   */
  private async recordAppliedMigration(
    name: string,
    filename: string
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO migrations (name, filename) VALUES (?, ?)",
      [name, filename]
    );
  }
}

// Example usage function to be called during backend startup
export async function initializeMigrations(dbConnection: Connection): Promise<void> {
  const migrator = new Migrator(dbConnection);
  await migrator.initialize();
}

// Database connection configuration interface

