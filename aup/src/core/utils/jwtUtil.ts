import { config } from '../config/mod';
import jwt from 'jsonwebtoken';

export const extractUserIdFromToken = (token: string): string => {
  try {
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwtSecret as string) as {
      id: string;
    };
    console.log(decoded);
    return decoded.id;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    throw error;
  }
};
