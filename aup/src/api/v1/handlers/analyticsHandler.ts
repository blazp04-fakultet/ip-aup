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

export const getSummary = async (req: Request, res: Response) => {
  try {
    const summary: SummaryDTO = {
      requestCount: 0,
      tokenCount: 0,
      moneySpent: 0,
      activeKeyCount: 0,
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

    const modelUsage: ModelUsageDTO = {
      model: 'Test Modle',
      modelProvider: 'Blaz',
      requestCount: 3542,
      moneySpent: 154.3,
      percentageOfTotalUsage: 100,
    };
    const usedModelsList: ModelUsageListDto = {
      page: 1,
      pageSize: 10,
      totalPages: 1,
      data: [modelUsage],
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
    const activity: ActivityDto = {
      id: 1,
      modelName: 'Test Model',
      createdAt: new Date(),
      tokenUsed: 1,
      moneySpent: 0.1,
    };
    const activityList: ActivityListDto = {
      page: 1,
      pageSize: 10,
      totalPages: 1,
      data: [activity],
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
