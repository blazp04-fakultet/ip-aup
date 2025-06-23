<template>
  <div class="model-usage-container">
    <h2>Korišteni modeli</h2>
    <v-virtual-scroll :height="`calc(100vh - 350px)`" :items="modelStore.model">
      <template #default="{ item }">
        <v-card>
          <div class="usage-card-header">
            <div class="left-section">
              <div class="model-icon">
                <v-icon>mdi-chart-line</v-icon>
              </div>
              <div class="model-info">
                <v-card-title>{{ item.model }}</v-card-title>
                <v-card-subtitle
                  >{{ item.modelProvider }} -
                  {{ item.requestCount }} requests</v-card-subtitle
                >
              </div>
            </div>
            <div class="right-section">
              <div class="usage-stats">
                <v-card-subtitle>Usage</v-card-subtitle>
                <v-card-subtitle>{{ item.moneySpent }} $</v-card-subtitle>
              </div>
            </div>
          </div>
          <div class="model-usage-card-statistics">
            <v-progress-linear :model-value="item.percentageOfTotalUsage" />
            <p>{{ item.percentageOfTotalUsage }}% of total usage</p>
          </div>
        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import type { ModelUsageListRequestDto } from "@/models/dto/modelUsageListDto";
import { useModelStore } from "@/stores/modelStore";

const modelStore = useModelStore();
onMounted(async () => {
  const searchModel: ModelUsageListRequestDto = {
    page: 1,
    pageSize: 10,
  };
  await modelStore.getModelUsage(searchModel);
});
</script>

<style>
.model-usage-container {
  overflow: auto;
  background-color: #222222;
  margin-left: 20px;
  padding: 10px;
  width: 100%;
}

.model-icon {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
}

.usage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-section {
  display: flex;
  align-items: center;
}

.usage-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.model-usage-card-statistics {
  padding: 10px 20px 10px 10px;
}
</style>
