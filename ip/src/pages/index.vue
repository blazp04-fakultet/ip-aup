<template>
  <div class="py-5 px-6">
    <div>
      <h1>Kontrolna ploča</h1>
      <p>Dobrodošli nazad!</p>
    </div>
    <v-container fluid>
      <v-row jalign="center">
        <template v-for="card in quickStats" :key="card">
          <AppStatisticsCard v-bind="card" />
        </template>
      </v-row>
    </v-container>
    <div class="details-section">
      <ModelUsage style="flex: 1" />
      <ReacentActivity style="flex: 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuickStats } from "@/stores/quickStats";

const quickStatsStore = useQuickStats();
onMounted(() => quickStatsStore.loadData({}));
const quickStats = computed(() => [
  {
    title: "Total Requests",
    value: quickStatsStore.totalRequests?.toString(),
    icon: "mdi-counter",
    color: "#2196F2",
  },
  {
    title: "Total Tokens",
    value: quickStatsStore.totalTokens.toString(),
    icon: "mdi-text",
    color: "#42A5F4",
  },
  {
    title: "Total Spent",
    value: "$ " + quickStatsStore.totalSpent.toString(),
    icon: "mdi-currency-usd",
    color: "#F2B74D",
  },
  {
    title: "Active Keys",
    value: quickStatsStore.activeKeys.toString(),
    icon: "mdi-key-variant",
    color: "#66BA6A",
  },
]);
</script>

<style>
.details-section {
  margin-top: 30px;
  display: flex;
}
@media (max-width: 768px) {
  .details-section {
    flex-direction: column;
  }
}
</style>
