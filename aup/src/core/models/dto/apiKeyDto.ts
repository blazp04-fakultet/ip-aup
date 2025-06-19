export interface ApiKey {
  id: number;
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
