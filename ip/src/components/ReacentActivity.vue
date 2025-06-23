<template>
  <div class="activity-usage-container">
    <h2>Reacent Activity</h2>
    <v-virtual-scroll
      :height="`calc(100vh - 350px)`"
      :items="activityStore.activity"
    >
      <template #default="{ item }">
        <v-card>
          <div class="usage-card-header">
            <div class="left-section">
              <div class="activity-icon">
                <v-icon>mdi-chart-line</v-icon>
              </div>
              <div class="activity-info">
                <v-card-title>API call to {{ item.modelName }}</v-card-title>
                <v-card-subtitle
                  >{{ timeAgo(item.createdAt) }}
                </v-card-subtitle>
              </div>
            </div>
            <div class="right-section">
              <div class="usage-stats">
                <v-card-subtitle>{{ item.tokenUsed }} tokens</v-card-subtitle>
                <v-card-subtitle>${{ item.moneySpent }}</v-card-subtitle>
              </div>
            </div>
          </div>
        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import type { ActivityListRequestDto } from "@/models/dto/activityListDto";
import { useActivityStore } from "@/stores/activityStore";
import { timeAgo } from "@/utils/timeAgo";

const activityStore = useActivityStore();

onMounted(async () => {
  const searchModel: ActivityListRequestDto = {
    page: 1,
    pageSize: 10,
  };
  await activityStore.getActivity(searchModel);
});
</script>

<style>
.activity-usage-container {
  overflow: auto;
  background-color: #222222;
  margin-left: 20px;
  padding: 10px;
  width: 100%;
}

@media (max-width: 768px) {
  .activity-usage-container {
    margin-top: 50px;
  }
}

.activity-icon {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0, 106, 255);
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

.activity-usage-card-statistics {
  padding: 10px 20px 10px 10px;
}
</style>
