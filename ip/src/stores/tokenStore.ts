import type { ApiKeyDto } from "@/models/dto/apiKeyDto";
import { defineStore } from "pinia";

export const useTokeStore = defineStore("tokenStore", () => {
  const apiKeys = ref<ApiKeyDto[]>([]);
  const newApiKey = ref("");

  const getApiKeys = async () => {
    apiKeys.value = [
      {
        id: 1,
        apiKey: "1234",
        tokenUsage: 1,
        moneySpent: 1,
        createdAt: new Date(),
        name: "Test",
        isActive: true,
      },
      {
        id: 2,
        apiKey: "1234",
        tokenUsage: 1,
        moneySpent: 1,
        createdAt: new Date(),
        name: "Test",
        isActive: true,
      },
    ];
  };

  const addNewApiKey = async (name: string) => {
    newApiKey.value = "ybgjkndsbjkadsfhjkdshfs";

    console.log("newApiKey", newApiKey.value);
  };
  const clear = async () => {
    newApiKey.value = "";
  };

  return {
    apiKeys,
    newApiKey,
    clear,
    getApiKeys,
    addNewApiKey,
  };
});
