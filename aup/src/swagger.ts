import swaggerJsdoc from 'swagger-jsdoc';
import { generateSchemasFromTypes } from './core/utils/autoSchemaGenerator';
import { config } from './core/config/mod';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LLMBridge API',
      version: '1.0.0',
      description: 'API dokumentacija za aplikaciju LLMBridge',
    },
    servers: [
      {
        url: `http://${config.hostname}:${config.port}`,
      },
    ],
    components: {
      schemas: {
        ...generateSchemasFromTypes(),
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/v1/routes/*.ts', './src/api/v1/handlers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
