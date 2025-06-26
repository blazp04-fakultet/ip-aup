export interface ApiKeyDto {
  id: string;
  apiKey: string;
  tokenUsage: number;
  moneySpent: number;
  createdAt: Date;
  name: string;
  isActive: boolean;
}

export interface CreateApiKeyParams {
  name: string;
}

export interface UpdateApiKeyParams {
  id: number;
  isActive: boolean;
}
