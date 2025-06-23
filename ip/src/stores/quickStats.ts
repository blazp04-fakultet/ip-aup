import { defineStore } from "pinia";

export const useQuickStats = defineStore("quickStats", () => {
  const totalRequests = ref<number>(0);
  const totalTokens = ref<number>(0);
  const totalSpent = ref<number>(0);
  const activeKeys = ref<number>(0);

  const loadData = (data: any) => {
    totalRequests.value = 1456;
    totalTokens.value = 1456;
    totalSpent.value = 1456;
    activeKeys.value = 1456;
  };

  return {
    totalRequests,
    totalTokens,
    totalSpent,
    activeKeys,
    loadData,
  };
});
