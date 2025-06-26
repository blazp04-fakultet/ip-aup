import { createHmac } from 'node:crypto';
import { config } from '../config/mod';

export function generateApiKey(
  userId: string,
  prefix = 'sk_',
  length = 32,
): string {
  //API key: a-b-c
  // a: key - used for finding key in DB
  // b: key-secret - encrypted part of key
  // c - userId - encrypted with b

  const key = Array.from({ length }, () =>
    Math.random().toString(36).charAt(2),
  ).join('');
  const keySecret = Array.from({ length }, () =>
    Math.random().toString(36).charAt(2),
  ).join('');

  return `${prefix}${key}-${keySecret}-${userId}`;
}

export function splitApiKey(apiKey: string): string[] {
  return apiKey.split('-');
}

export function encryptApiKey(apiKey: string) {
  const apiSplit = splitApiKey(apiKey);
  const key = apiSplit[0];
  const secret = apiSplit[1] + apiSplit[2];

  const hash = createHmac('sha256', config.jwtSecret)
    .update(secret)
    .digest('hex');

  return { key, secret: hash };
}

export function getUserIdFromApiKey(apiKey: string) {
  const apiSplit = splitApiKey(apiKey);
  return apiSplit[2];
}
