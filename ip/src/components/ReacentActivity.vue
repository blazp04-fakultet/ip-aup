<template>
  <div class="activity-usage-container">
    <h2>Recent Activity</h2>
    <v-virtual-scroll
      :height="`calc(100vh - 350px)`"
      :items="activityStore.activity"
      @scroll="handleScroll"
      ref="virtualScrollRef"
    >
      <template #default="{ item }">
        <v-card class="mb-2">
          <div class="usage-card-header">
            <div class="left-section">
              <div class="activity-icon">
                <v-icon>mdi-chart-line</v-icon>
              </div>
              <div class="activity-info">
                <v-card-title>API call to {{ item.modelName }}</v-card-title>
                <v-card-subtitle>{{ timeAgo(item.createdAt) }}</v-card-subtitle>
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

    <!-- Loading indicator -->
    <div v-if="activityStore.isLoading" class="loading-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="ml-2">Loading more activities...</span>
    </div>

    <!-- End of data indicator -->
    <div
      v-if="!activityStore.hasMoreData && activityStore.activityCount > 0"
      class="end-indicator"
    >
      <v-divider></v-divider>
      <span class="text-caption text-disabled">No more activities to load</span>
    </div>

    <!-- Error indicator -->
    <div v-if="activityStore.hasError" class="error-container">
      <v-alert type="error" variant="tonal">
        {{ activityStore.error }}
      </v-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityListRequestDto } from "@/models/dto/activityListDto";
import { useActivityStore } from "@/stores/activityStore";
import { timeAgo } from "@/utils/timeAgo";
import { ref, onMounted, nextTick } from "vue";

const activityStore = useActivityStore();
const virtualScrollRef = ref();
const currentPage = ref(1);
const pageSize = ref(10);

// Throttle function to limit scroll event frequency
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return function (...args: any[]) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const loadMoreData = async () => {
  if (activityStore.isLoading || !activityStore.hasMoreData) return;

  try {
    const searchModel: ActivityListRequestDto = {
      page: currentPage.value + 1,
      pageSize: pageSize.value,
    };

    const result = await activityStore.getActivity(searchModel, true);

    if (result && result.length > 0) {
      currentPage.value++;
    }
  } catch (error) {
    console.error("Error loading more activities:", error);
  }
};

const handleScroll = throttle((event: Event) => {
  const target = event.target as HTMLElement;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;

  // Trigger load more when user is near the bottom (within 100px)
  const threshold = 100;
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    loadMoreData();
  }
}, 200);

// Reset pagination state
const resetPagination = () => {
  currentPage.value = 1;
  activityStore.clearActivity();
};

// Initial load
onMounted(async () => {
  try {
    const searchModel: ActivityListRequestDto = {
      page: 1,
      pageSize: pageSize.value,
    };

    await activityStore.getActivity(searchModel, false);
    currentPage.value = 1;
  } catch (error) {
    console.error("Error loading initial activities:", error);
  }
});

// Expose methods that might be useful from parent components
defineExpose({
  resetPagination,
  loadMoreData,
});
</script>

<style scoped>
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #ffffff;
}

.end-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
}

.text-disabled {
  color: rgba(255, 255, 255, 0.6);
}

.error-container {
  padding: 10px;
}
</style>
