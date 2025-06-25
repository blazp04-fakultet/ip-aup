import { Connection } from 'mysql2/promise';
import { startServer } from './app.ts';
import { config } from './core/config/mod.ts';
import { createDatabaseConnection, DatabaseConfig } from './core/db/client.ts';
import { initializeMigrations } from './core/db/migrations/migrations.ts';

let dbConnection: Connection;
async function main() {
  console.log('Connecting to database...');
  console.log(config.database);
  dbConnection = await createDatabaseConnection(config.database);
  console.log('Applaying migrations...');
  await initializeMigrations(dbConnection);
  console.log('Starting application...');
  startServer();
  console.log('Application started.');
}

main();
