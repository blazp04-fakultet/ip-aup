import swaggerJsdoc from 'swagger-jsdoc';
import { generateSchemasFromTypes } from './core/utils/autoSchemaGenerator';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'A description of your API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
    components: {
      schemas: {
        ...generateSchemasFromTypes(),
      },
    },
  },
  apis: ['./src/api/v1/routes/*.ts', './src/api/v1/handlers/*.ts'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
