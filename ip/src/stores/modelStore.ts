import type { ModelUsageDTO } from "@/models/dto/modelUsageDto";
import type { ModelUsageListRequestDto } from "@/models/dto/modelUsageListDto";
import { fetchUsedModels } from "@/repositories/analyticsRepository";
import { defineStore } from "pinia";

export const useModelStore = defineStore("modelStore", () => {
  const model = ref<ModelUsageDTO[]>([]);
  const page = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPages = ref<number>(0);

  const getModelUsage = async (searchModel: ModelUsageListRequestDto) => {
    const response = await fetchUsedModels(searchModel);
    page.value = response.page;
    pageSize.value = response.pageSize;
    totalPages.value = response.totalPages;
    model.value = response.data;
  };

  return { model, page, pageSize, totalPages, getModelUsage };
});
