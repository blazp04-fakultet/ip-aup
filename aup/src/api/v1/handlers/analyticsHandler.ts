import { Request, Response } from 'express';
import { SummaryDTO } from '../../../core/models/dto/summaryDto';
import {
  ModelUsageListDto,
  ModelUsageListRequestDto,
} from '../../../core/models/dto/modelUsageListDto';
import {
  ActivityListDto,
  ActivityListRequestDto,
} from '../../../core/models/dto/activityListDto';
import { ActivityDto } from '../../../core/models/dto/activityDto';
import { ModelUsageDTO } from '../../../core/models/dto/modelUsageDto';
import {
  getModelUsageAnalytics,
  getUsageLogsByUserId,
  getUserTotalUsage,
} from '../../../core/db/repositories/usageRepository';
import { dbConnection } from '../../../server';
import { calculatePrice } from '../../../core/utils/pricingUtil';
import { getApiKeyCount } from '../../../core/db/repositories/apiKeyRepository';
import { UsageModel } from '../../../core/models/database/usageModel';
import { extractUserIdFromToken } from '../../../core/utils/jwtUtil';

export const getSummary = async (req: Request, res: Response) => {
  try {
    const userID = extractUserIdFromToken(req.headers.authorization as string);
    const { totalRequests, totalTokens } = await getUserTotalUsage(
      dbConnection,
      userID,
    );

    const apiKeyNumber = await getApiKeyCount(dbConnection, userID);

    const summary: SummaryDTO = {
      requestCount: totalRequests,
      tokenCount: totalTokens,
      moneySpent: calculatePrice(totalTokens, 'model154'),
      activeKeyCount: apiKeyNumber,
    };

    if (summary) {
      res.json({
        success: true,
        data: summary,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Summary not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve summary',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUsedModels = async (req: Request, res: Response) => {
  try {
    const params: ModelUsageListRequestDto = req.body;
    const userID = extractUserIdFromToken(req.headers.authorization as string);

    const data = await getModelUsageAnalytics(dbConnection, userID, params);

    const usedModelsList: ModelUsageListDto = {
      page: data.page,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
      data: data.data.map((dbModel) => {
        const moneySpent = calculatePrice(dbModel.totalTokens, dbModel.model);

        const modelUsageDTO: ModelUsageDTO = {
          model: dbModel.model,
          modelProvider: dbModel.modelProvider,
          requestCount: dbModel.requestCount,
          moneySpent: moneySpent,
          percentageOfTotalUsage: dbModel.percentageOfTotalUsage,
        };

        return modelUsageDTO;
      }),
    };

    if (usedModelsList) {
      res.json({
        success: true,
        data: usedModelsList,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Used models not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve used models',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getReacentActivity = async (req: Request, res: Response) => {
  try {
    const params: ActivityListRequestDto = req.body;
    const userId = extractUserIdFromToken(req.headers.authorization as string);

    const result = await getUsageLogsByUserId(dbConnection, userId, params);

    const activity: ActivityDto[] = result.data.map((usage) => ({
      id: parseInt(usage.id),
      modelName: usage.model_name,
      createdAt: usage.created_at,
      tokenUsed: usage.token_count,
      moneySpent: calculatePrice(usage.token_count, usage.model_name),
    }));

    const totalPages = Math.ceil(result.totalCount / params.pageSize);

    const activityList: ActivityListDto = {
      page: params.page,
      pageSize: params.pageSize,
      totalPages: totalPages,
      data: activity,
    };

    if (activityList) {
      res.json({
        success: true,
        data: activityList,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Recent activity not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent activity',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
