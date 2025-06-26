import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const config = {
  port: parseInt(process.env.PORT ?? '4242', 10),
  hostname: process.env.HOSTNAME ?? '0.0.0.0',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'blaz',
    password: process.env.DB_PASSWORD || 'blaz',
    database: process.env.DB_NAME || 'llmbridge',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
  llmProviders: [
    {
      name: 'OpenAI',
      apiKey: process.env.OPENAI_API_KEY || '',
      endpoint: 'https://api.openai.com/v1',
    },
    {
      name: 'Groq',
      apiKey: process.env.GROQ_API_KEY || '',
      endpoint: 'https://api.groq.com/openai/v1',
    },
  ],
};

if (!config.database.host) {
  console.error('Missing required environment variable: DATABASE_HOST');
  process.exit(1);
}
