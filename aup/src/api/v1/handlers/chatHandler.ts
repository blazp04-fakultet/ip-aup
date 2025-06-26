import { Request, Response } from 'express';
import axios from 'axios';
import { config } from '../../../core/config/mod';
import { addUsageLog } from '../../../core/db/repositories/usageRepository';
import { dbConnection } from '../../../server';
import { randomUUID } from 'crypto';
import {
  encryptApiKey,
  getUserIdFromApiKey,
} from '../../../core/utils/apiKeyUtil';

export const listModelsHandler = async (req: Request, res: Response) => {
  try {
    const allModels: any[] = [];

    for (const provider of config.llmProviders) {
      try {
        const { data } = await axios.get(provider.endpoint + '/models', {
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
          },
        });

        const providerModels = data.data.map((model: any) => ({
          id: `${provider.name}::${model.id}`,
          object: model.object,
        }));

        allModels.push(...providerModels);
      } catch (providerError: any) {
        console.error(
          `Failed to fetch models from provider ${provider.name}:`,
          providerError.message,
        );
      }
    }

    res.json({
      success: true,
      data: allModels,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch models from providers',
      error: error.message || 'Unknown error',
    });
  }
};

export const chatHandler = async (req: Request, res: Response) => {
  try {
    const { model, ...otherBodyParams } = req.body;

    const modelParts = model.split('::');
    if (modelParts.length !== 2) {
      res.status(400).json({
        success: false,
        message: 'Invalid model format. Expected format: provider::model',
      });
      return;
    }

    const [providerName, actualModel] = modelParts;

    const provider = config.llmProviders.find((p) => p.name === providerName);
    if (!provider) {
      res.status(400).json({
        success: false,
        message: `Provider '${providerName}' not found in configuration`,
      });
      return;
    }

    const body = {
      ...otherBodyParams,
      model: actualModel,
      stream: false,
    };

    const { data } = await axios.post(
      provider.endpoint + '/chat/completions',
      body,
      {
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const keyApi = (req.headers.authorization as string).replace('Bearer ', '');
    await addUsageLog(dbConnection, {
      id: randomUUID(),
      modelName: actualModel,
      tokenCount: data.usage.total_tokens,
      modelProvider: providerName,
      userId: getUserIdFromApiKey(keyApi),
      apiKey: encryptApiKey(keyApi).key + '-' + encryptApiKey(keyApi).secret,
    });

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error getting chat completion:', error);
    res.status(error?.response?.status || 500).json({
      success: false,
      message: 'Failed to get chat completion',
      error: error?.response?.data || error.message || 'Unknown error',
    });
  }
};
