import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const config = {
  port: parseInt(process.env.PORT ?? '4242', 10),
  hostname: process.env.HOSTNAME ?? '0.0.0.0',
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'blaz',
    password: process.env.DB_PASSWORD || 'blaz',
    database: process.env.DB_NAME || 'llmbridge',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
};

if (!config.database.host) {
  console.error('Missing required environment variable: DATABASE_HOST');
  process.exit(1);
}
