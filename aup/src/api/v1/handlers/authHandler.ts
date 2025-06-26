import { Request, Response } from 'express';
import {
  AuthResponseDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
} from '../../../core/models/dto/authDto';
import {
  createUser,
  loginUser,
} from '../../../core/db/repositories/userRepository';
import { UserModel } from '../../../core/models/database/userModel';
import { randomUUID } from 'crypto';
import { dbConnection } from '../../../server';
import { Connection } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../core/config/mod';
import {
  LoginParams,
  LoginResult,
} from '../../../core/db/repositories/loginModel';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const data: LoginRequestDto = req.body;

    const loginParams: LoginParams = {
      email: data.email,
      password: data.password,
    };
    const loginData: LoginResult = await loginUser(dbConnection, loginParams);

    const token = jwt.sign(
      { id: loginData.id, email: loginData.email },
      config.jwtSecret,
      {
        expiresIn: '1h',
      },
    );

    const response: AuthResponseDto = {
      token: token,
      refreshToken: 'jhsddsbfkjbsdkjflers7324sd',
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

    const passwordHash = await bcrypt.hash(data.password, 10);

    const userModel: UserModel = {
      id: randomUUID(),
      email: data.email,
      password: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      deletedAt: null,
    };
    await createUser(dbConnection, userModel);
    console.log(userModel);

    const token = jwt.sign(
      { id: userModel.id, email: userModel.email },
      config.jwtSecret,
      {
        expiresIn: '1h',
      },
    );

    const response: AuthResponseDto = {
      token: token,
      refreshToken: 'jhsddsbfkjbsdkjflers7324sd',
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
