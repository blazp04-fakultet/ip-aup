import { defineStore } from "pinia";

export const useBillingStore = defineStore("billingStore", () => {
  const balance = ref<number>(0);

  const getBalance = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    balance.value = 1000;
  };

  const addBalance = async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    balance.value += amount;
  };
  return {
    balance,
    getBalance,
    addBalance,
  };
});
