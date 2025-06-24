import type {
  ApiKeyDto,
  CreateApiKeyParams,
  UpdateApiKeyParams,
} from "@/models/dto/apiKeyDto";
import apiConfig from "./client";

export async function fetchApiKeys(): Promise<ApiKeyDto[]> {
  const response = await apiConfig.get("/api-keys");
  const data = await response.data.data;

  const apiKeys: ApiKeyDto[] = data;
  return apiKeys;
}

export async function createApiKey(
  params: CreateApiKeyParams
): Promise<ApiKeyDto> {
  const response = await apiConfig.post("/api-keys/new", params);
  const data = await response.data.data;

  const apiKey: ApiKeyDto = data;
  return apiKey;
}

export async function updateApiKey(
  params: UpdateApiKeyParams
): Promise<ApiKeyDto> {
  const response = await apiConfig.put(`/api-keys/update`, params);
  const data = await response.data.data;

  const apiKey: ApiKeyDto = data;
  return apiKey;
}
