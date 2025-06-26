export interface ApiKey {
  id: string;
  key: string;
  name: string;
  role: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface UpdateApiKeyRequest {
  role?: string;
}

export interface CreateApiKeyParams {
  id: string;
  key: string;
  name: string;
  role?: string;
  user_id: string;
}
