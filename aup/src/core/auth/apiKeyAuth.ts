import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/mod';
import { validateApiKey } from '../db/repositories/apiKeyRepository';
import { encryptApiKey } from '../utils/apiKeyUtil';
import { dbConnection } from '../../server';

export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const encryptedToken = encryptApiKey(token);

  const valid = await validateApiKey(dbConnection, encryptedToken.secret);
  if (!valid) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
  if (valid?.deleted_at !== null) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
  res.status(200).json({ message: valid });
};
