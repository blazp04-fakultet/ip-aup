import { type ModelUsageDTO } from "./modelUsageDto";

export interface ModelUsageListDto {
  data: ModelUsageDTO[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ModelUsageListRequestDto {
  page: number;
  pageSize: number;
}
