import type { ActivityDto } from "@/models/dto/activityDto";
import type { ActivityListRequestDto } from "@/models/dto/activityListDto";
import type { ModelUsageDTO } from "@/models/dto/modelUsageDto";
import type { ModelUsageListRequestDto } from "@/models/dto/modelUsageListDto";
import { defineStore } from "pinia";

export const useActivityStore = defineStore("activityStore", () => {
  const activity = ref<ActivityDto[]>([]);
  const page = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPages = ref<number>(0);

  const getActivity = async (searchModel: ActivityListRequestDto) => {
    activity.value = [
      {
        id: 1,
        modelName: "Test Model",
        createdAt: new Date(),
        tokenUsed: 1,
        moneySpent: 0.1,
      },
    ];
  };

  return { activity, page, pageSize, totalPages, getActivity };
});
