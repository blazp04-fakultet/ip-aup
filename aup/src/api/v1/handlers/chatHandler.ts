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

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODELS_URL = 'https://api.openai.com/v1/models';

export const listModelsHandler = async (req: Request, res: Response) => {
  try {
    const allModels: any[] = [];

    // Loop through all LLM providers
    for (const provider of config.llmProviders) {
      try {
        const { data } = await axios.get(provider.endpoint + '/models', {
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
          },
        });

        // Add models with provider name prefix
        const providerModels = data.data.map((model: any) => ({
          id: `${provider.name}::${model.id}`,
          object: model.object,
        }));

        allModels.push(...providerModels);
      } catch (providerError: any) {
        // Log error for this provider but continue with others
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

    //TODO: Dodati ovdje korisnika iz autorizacije kao i api key koji koristi
    const apiKey =
      'sk_eysiuockgkg89ctmiqmusa55c47mu574-6wzrf4zlz9erqiqzd16bm42im7bx8zl4-a5d0e15a-2eb8-4978-b193-86510c7dafa5';
    await addUsageLog(dbConnection, {
      id: randomUUID(),
      modelName: actualModel,
      tokenCount: data.usage.total_tokens,
      modelProvider: providerName,
      userId: getUserIdFromApiKey(apiKey),
      apiKey: encryptApiKey(apiKey).key + '-' + encryptApiKey(apiKey).secret,
    });

    res.status(200).json(data);
  } catch (error: any) {
    res.status(error?.response?.status || 500).json({
      success: false,
      message: 'Failed to get chat completion',
      error: error?.response?.data || error.message || 'Unknown error',
    });
  }
};
