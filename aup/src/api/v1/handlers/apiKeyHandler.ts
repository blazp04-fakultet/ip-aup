import { Request, Response } from 'express';
import { ApiKeyDto } from '../../../core/models/dto/apiKeyDto';
import {
  addApiKey,
  deleteApiKey,
  getApiKeysByUserId,
} from '../../../core/db/repositories/apiKeyRepository';
import { dbConnection } from '../../../server';
import { randomUUID } from 'crypto';
import { encryptApiKey, generateApiKey } from '../../../core/utils/apiKeyUtil';
import { getUserTotalUsageForApiKey } from '../../../core/db/repositories/usageRepository';
import { calculatePrice } from '../../../core/utils/pricingUtil';
import { extractUserIdFromToken } from '../../../core/utils/jwtUtil';

export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const userID = extractUserIdFromToken(req.headers.authorization as string);

    const data = await getApiKeysByUserId(dbConnection, userID);

    const apiKeys: ApiKeyDto[] = await Promise.all(
      data.map(async (item) => {
        // const encryptedKey = encryptApiKey(item.key);
        // const keyIdentifier = `${encryptedKey.key}-${encryptedKey.secret}`;
        // const totalUsage = await getUserTotalUsageForApiKey(
        //   dbConnection,
        //   keyIdentifier,
        // );

        return {
          id: item.id,
          apiKey: item.id.substring(0, 8) + '...',
          tokenUsage: 100,
          moneySpent: 2,
          createdAt: item.created_at,
          name: item.name,
          isActive: item.deleted_at === null,
        };
      }),
    );

    res.json({
      success: true,
      data: apiKeys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve API keys',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
export const createApiKey = async (req: Request, res: Response) => {
  try {
    const apiKeyData: ApiKeyDto = req.body;

    const userId = extractUserIdFromToken(req.headers.authorization as string);
    const generatedApiKey = generateApiKey(userId);

    const newApiKey = await addApiKey(dbConnection, {
      id: encryptApiKey(generatedApiKey).key,
      key: encryptApiKey(generatedApiKey).secret,
      name: apiKeyData.name,
      role: 'admin',
      user_id: userId,
    });

    const apiKey: ApiKeyDto = {
      id: newApiKey.id,
      apiKey: generatedApiKey,
      tokenUsage: 0,
      moneySpent: 0,
      createdAt: new Date(),
      name: newApiKey.name,
      isActive: true,
    };
    res.json({
      success: true,
      data: apiKey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create API key',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
export const updateApiKEyStatus = async (req: Request, res: Response) => {
  try {
    const apiKeyData: ApiKeyDto = req.body;
    const keyApi = (req as any).user.user_id;

    const encryptedKey = encryptApiKey(keyApi);
    const deleted = await deleteApiKey(dbConnection, encryptedKey.key);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update API key status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
