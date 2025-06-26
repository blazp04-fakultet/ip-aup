import { Router } from 'express';
import analyticsRoutes from './analytics.ts';
import apiKeyRoutes from './apiKey.ts';
import balanceRoutes from './balance.ts';
import authRoutes from './auth.ts';
import chatRoutes from './chat.ts';
import { authenticateApiKey } from '../../../core/auth/apiKeyAuth.ts';
import { authenticateJWT } from '../../../core/auth/jwtAuth.ts';

const v1router = Router();

v1router.use('/analytics', authenticateJWT, analyticsRoutes);
v1router.use('/api-keys', authenticateJWT, apiKeyRoutes);
v1router.use('/balance', authenticateJWT, balanceRoutes);
v1router.use('/auth', authRoutes);
v1router.use('/', authenticateApiKey, chatRoutes);

v1router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default v1router;
