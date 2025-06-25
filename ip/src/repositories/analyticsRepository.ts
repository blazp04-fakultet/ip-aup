import type { SummaryDTO } from "@/models/dto/summaryDto";
import apiConfig from "./client";
import type {
  ModelUsageListDto,
  ModelUsageListRequestDto,
} from "@/models/dto/modelUsageListDto";
import type {
  ActivityListDto,
  ActivityListRequestDto,
} from "@/models/dto/activityListDto";

export async function fetchSummary(): Promise<SummaryDTO> {
  const response = await apiConfig.get("/analytics/summary");
  const data = await response.data.data;

  const summary: SummaryDTO = data;
  return summary;
}

export async function fetchUsedModels(
  searchModel: ModelUsageListRequestDto
): Promise<ModelUsageListDto> {
  const response = await apiConfig.post("/analytics/used-models", searchModel);
  const data = await response.data;

  const summary: ModelUsageListDto = data.data;
  return summary;
}

export async function fetchActivity(
  searchModel: ActivityListRequestDto
): Promise<ActivityListDto> {
  const response = await apiConfig.post(
    "/analytics/recent-activity",
    searchModel
  );
  const data = await response.data.data;

  const activity: ActivityListDto = data;
  return activity;
}
