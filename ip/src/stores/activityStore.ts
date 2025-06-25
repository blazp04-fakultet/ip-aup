import type { ActivityDto } from "@/models/dto/activityDto";
import type { ActivityListRequestDto } from "@/models/dto/activityListDto";
import type { ModelUsageDTO } from "@/models/dto/modelUsageDto";
import type { ModelUsageListRequestDto } from "@/models/dto/modelUsageListDto";
import {
  fetchActivity,
  fetchSummary,
} from "@/repositories/analyticsRepository";
import { defineStore } from "pinia";

export const useActivityStore = defineStore("activityStore", () => {
  const activity = ref<ActivityDto[]>([]);
  const page = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPages = ref<number>(0);

  const getActivity = async (searchModel: ActivityListRequestDto) => {
    const response = await fetchActivity(searchModel);
    page.value = response.page;
    pageSize.value = response.pageSize;
    totalPages.value = response.totalPages;
    activity.value = response.data;
  };

  return { activity, page, pageSize, totalPages, getActivity };
});
