import { Request, Response } from 'express';
import {
  AuthResponseDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
} from '../../../core/models/dto/authDto';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const data: LoginRequestDto = req.body;

    const response: AuthResponseDto = {
      token: 'token',
      refreshToken: 'refreshToken',
    };

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const data: RegisterRequestDto = req.body;

    const response: AuthResponseDto = {
      token: 'token',
      refreshToken: 'refreshToken',
    };

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to register',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const data: RefreshTokenRequestDto = req.body;

    const response: AuthResponseDto = {
      token: 'token',
      refreshToken: 'refreshToken',
    };

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
