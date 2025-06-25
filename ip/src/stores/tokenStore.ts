import type {
  ApiKeyDto,
  CreateApiKeyParams,
  UpdateApiKeyParams,
} from "@/models/dto/apiKeyDto";
import {
  createApiKey,
  fetchApiKeys,
  updateApiKey,
} from "@/repositories/apiKeyRepository";
import { defineStore } from "pinia";

export const useTokeStore = defineStore("tokenStore", () => {
  const apiKeys = ref<ApiKeyDto[]>([]);
  const newApiKey = ref("");

  const getApiKeys = async () => {
    const response = await fetchApiKeys();
    apiKeys.value = response;
  };

  const addNewApiKey = async (name: string) => {
    const params: CreateApiKeyParams = {
      name,
    };
    const response = await createApiKey(params);
    newApiKey.value = response.apiKey;
  };

  const deleteApiKey = async (id: number) => {
    const params: UpdateApiKeyParams = {
      id,
      isActive: false,
    };
    const response = await updateApiKey(params);
  };
  const clear = async () => {
    newApiKey.value = "";
  };

  return {
    apiKeys,
    newApiKey,
    deleteApiKey,
    clear,
    getApiKeys,
    addNewApiKey,
  };
});
