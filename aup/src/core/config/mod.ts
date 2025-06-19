import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT ?? '4242', 10),
  hostname: process.env.HOSTNAME ?? '0.0.0.0',
  database: {
    username: process.env.DATABASE_USERNAME ?? 'user',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    host: process.env.DATABASE_HOST ?? 'host',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    name: process.env.DATABASE_NAME ?? 'database',
    url: process.env.DATABASE_URL ?? '',
  },
};

if (!config.database.url) {
  console.error('Missing required environment variable: DATABASE_URL');
  process.exit(1);
}
