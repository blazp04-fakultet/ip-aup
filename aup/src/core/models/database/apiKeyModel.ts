export interface ApiKey {
  id: string;
  key: string;
  role: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface CreateApiKeyRequest {
  key: string;
  role?: string;
  user_id: string;
}

export interface UpdateApiKeyRequest {
  role?: string;
}
