import * as TJS from 'typescript-json-schema';
import * as path from 'path';

export const generateSchemasFromTypes = () => {
  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true,
  };

  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };

  const modelFiles = [
    path.join(__dirname, '../models/dto/accountBalanceDto.ts'),
    path.join(__dirname, '../models/dto/activityDto.ts'),
    path.join(__dirname, '../models/dto/activityListDto.ts'),
    path.join(__dirname, '../models/dto/apiKeyDto.ts'),
    path.join(__dirname, '../models/dto/modelUsageDto.ts'),
    path.join(__dirname, '../models/dto/modelUsageListDto.ts'),
    path.join(__dirname, '../models/dto/summaryDto.ts'),
    path.join(__dirname, '../models/dto/userDto.ts'),
    path.join(__dirname, '../models/dto/authDto.ts'),
    path.join(__dirname, '../models/dto/chatDto.ts'),
  ];

  const program = TJS.getProgramFromFiles(modelFiles, compilerOptions);

  const schemas: Record<string, any> = {};
  const typeNames = [
    'SummaryDTO',
    'CreateUserDto',
    'UpdateUserDto',
    'UserResponseDto',
    'AccountBalanceDTO',
    'AddFundsRequest',
    'ModelUsageListDto',
    'ModelUsageListRequestDto',
    'ActivityListRequestDto',
    'ModelUsageDTO',
    'ApiKeyDto',
    'CreateApiKeyParams',
    'UpdateApiKeyParams',
    'ActivityListDto',
    'ActivityDto',
    'LoginRequestDto',
    'AuthResponseDto',
    'RefreshTokenRequestDto',
    'RegisterRequestDto',
    'ChatMessage',
    'ChatCompletionRequestDto',
  ];

  typeNames.forEach((typeName) => {
    const schema = TJS.generateSchema(program, typeName, settings);
    if (schema) {
      schemas[typeName] = schema;
    }
  });

  return schemas;
};
