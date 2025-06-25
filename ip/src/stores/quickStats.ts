import { fetchSummary } from "@/repositories/analyticsRepository";
import { defineStore } from "pinia";

export const useQuickStats = defineStore("quickStats", () => {
  const totalRequests = ref<number>(0);
  const totalTokens = ref<number>(0);
  const totalSpent = ref<number>(0);
  const activeKeys = ref<number>(0);

  const loadData = async (data: any) => {
    const response = await fetchSummary();

    totalRequests.value = response.requestCount;
    totalTokens.value = response.tokenCount;
    totalSpent.value = response.moneySpent;
    activeKeys.value = response.activeKeyCount;
  };

  return {
    totalRequests,
    totalTokens,
    totalSpent,
    activeKeys,
    loadData,
  };
});
