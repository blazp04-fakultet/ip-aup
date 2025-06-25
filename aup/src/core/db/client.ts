import { Connection, createConnection } from 'mysql2/promise';

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export async function createDatabaseConnection(
  config: DatabaseConfig,
): Promise<Connection> {
  return createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port || 3306,
  });
}
