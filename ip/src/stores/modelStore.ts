import type { ModelUsageDTO } from "@/models/dto/modelUsageDto";
import type { ModelUsageListRequestDto } from "@/models/dto/modelUsageListDto";
import { defineStore } from "pinia";

export const useModelStore = defineStore("modelStore", () => {
  const model = ref<ModelUsageDTO[]>([]);
  const page = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPages = ref<number>(0);

  const getModelUsage = async (searchModel: ModelUsageListRequestDto) => {
    model.value = [
      {
        model: "Test Modle",
        modelProvider: "Blaz",
        requestCount: 1,
        moneySpent: 154.3,
        percentageOfTotalUsage: 100,
      },
      {
        model: "Test Modle",
        modelProvider: "Blaz",
        requestCount: 3542,
        moneySpent: 154.3,
        percentageOfTotalUsage: 10,
      },
      {
        model: "Test Modle",
        modelProvider: "Blaz",
        requestCount: 44,
        moneySpent: 154.3,
        percentageOfTotalUsage: 50,
      },
      {
        model: "Test Modle",
        modelProvider: "Blaz",
        requestCount: 3542,
        moneySpent: 154.3,
        percentageOfTotalUsage: 4,
      },
    ];
  };

  return { model, page, pageSize, totalPages, getModelUsage };
});
