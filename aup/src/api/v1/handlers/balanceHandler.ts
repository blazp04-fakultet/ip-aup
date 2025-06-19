import { Request, Response } from 'express';
import {
  AccountBalanceDTO,
  AddFundsRequest,
} from '../../../core/models/dto/accountBalanceDto';

export const getBalance = async (req: Request, res: Response) => {
  const balance: AccountBalanceDTO = {
    currentBalance: 1000,
  };
  try {
    res.json({
      success: true,
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve balance',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
export const addBalance = async (req: Request, res: Response) => {
  try {
    const params: AddFundsRequest = req.body;
    const balance: AccountBalanceDTO = {
      currentBalance: 1000,
    };

    res.json({
      success: true,
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add balance',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
