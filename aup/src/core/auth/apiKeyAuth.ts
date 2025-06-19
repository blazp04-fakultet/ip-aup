// import { Request, Response, NextFunction } from 'express';
// import { validateApiKey } from '../db/repositories/apiKeyRepository';
// import { connectToDatabase } from '../db/client';
// import { encryptApiKey } from '../utils/apiKeyUtils';

// import { ApiKey } from '../models/dto/apiKey';

// export const apiKeyAuthMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const providedKey = req.header('X-API-KEY');
//   if (!providedKey) {
//     return res.status(401).json({ error: 'Unauthorized: Missing API Key' });
//   }

//   const dbClient = await connectToDatabase();
//   const encrypted = encryptApiKey(providedKey);

//   console.log('API Key not found in cache, adding to DB...');
//   const validApiKey = await validateApiKey(
//     dbClient,
//     encrypted.secret,
//     encrypted.key,
//   );

//   if (!validApiKey) {
//     return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
//   }

//   next();
// };
