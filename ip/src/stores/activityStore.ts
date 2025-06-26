// activityStore.ts
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
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getActivity = async (
    searchModel: ActivityListRequestDto,
    append: boolean = false
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchActivity(searchModel);

      page.value = response.page;
      pageSize.value = response.pageSize;
      totalPages.value = response.totalPages;

      if (searchModel.page === 1 || !append) {
        // First page or reset - replace all data
        activity.value = response.data;
      } else {
        // Subsequent pages - append to existing data
        activity.value = [...activity.value, ...response.data];
      }

      return response.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Error fetching activity:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Method to clear all activity data
  const clearActivity = () => {
    activity.value = [];
    page.value = 0;
    pageSize.value = 0;
    totalPages.value = 0;
    error.value = null;
  };

  // Method to add a single activity item (useful for real-time updates)
  const addActivity = (item: ActivityDto) => {
    activity.value.unshift(item); // Add to beginning
  };

  // Computed properties
  const activityCount = computed(() => activity.value.length);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => !!error.value);
  const hasMoreData = computed(() => page.value < totalPages.value);

  return {
    activity,
    page,
    pageSize,
    totalPages,
    loading,
    error,
    getActivity,
    clearActivity,
    addActivity,
    activityCount,
    isLoading,
    hasError,
    hasMoreData,
  };
});
