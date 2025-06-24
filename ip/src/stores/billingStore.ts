import type { AddFundsRequest } from "@/models/dto/accountBalanceDto";
import { addFunds, fetchBalance } from "@/repositories/balanceRepository";
import { defineStore } from "pinia";

export const useBillingStore = defineStore("billingStore", () => {
  const balance = ref<number>(0);

  const getBalance = async () => {
    const response = await fetchBalance();
    balance.value = response.currentBalance;
  };

  const addBalance = async (amount: number) => {
    const params: AddFundsRequest = { amount };
    const response = await addFunds(params);
    balance.value = response.currentBalance;
  };
  return {
    balance,
    getBalance,
    addBalance,
  };
});
