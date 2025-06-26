export interface UsageLogModel {
  id: string;
  modelName: string;
  tokenCount: number;
  modelProvider: string;
  userId: string;
  apiKey: string;
}

export interface UsageModel {
  id: string;
  model_name: string;
  token_count: number;
  model_provider: string;
  created_at: Date;
  user_id: string;
  api_key: string;
}

export interface ModelUsageModel {
  model: string;
  modelProvider: string;
  requestCount: number;
  totalTokens: number;
  percentageOfTotalUsage: number;
  userId: string;
}
