import type {
  AccountBalanceDTO,
  AddFundsRequest,
} from "@/models/dto/accountBalanceDto";
import apiConfig from "./client";

export async function fetchBalance(): Promise<AccountBalanceDTO> {
  const response = await apiConfig.get("/balance");
  const data = await response.data.data;

  const balance: AccountBalanceDTO = data;
  return balance;
}

export async function addFunds(
  params: AddFundsRequest
): Promise<AccountBalanceDTO> {
  const response = await apiConfig.post("/balance/add", params);
  const data = await response.data.data;

  const balance: AccountBalanceDTO = data;
  return balance;
}
