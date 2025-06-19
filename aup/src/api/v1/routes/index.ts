import { Router } from 'express';
import userRoutes from './users.ts';

const v1router = Router();

v1router.use('/users', userRoutes);

v1router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default v1router;
