import express from 'express';
import { config } from './core/config/mod.ts';
import v1router from './api/v1/routes/index.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.ts';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
// app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1router);

app.get('/', (req, res) => {
  res.json({ message: 'Welcom to LLMBridge' });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('Unhandled application error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  },
);

export const startServer = async () => {
  try {
    const server = app.listen(config.port, config.hostname, () => {
      console.log(`Listening on: http://${config.hostname}:${config.port}`);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

export default app;
