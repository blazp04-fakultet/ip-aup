<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <v-card
    class="mx-auto mt-4 py-4 px-6"
    :style="{ backgroundColor: `${color}40` }"
    elevation="16"
    max-width="600px"
    min-width="22%"
  >
    <v-card-item>
      <div class="content-wrapper">
        <div class="text-content">
          <div class="main-number" :style="{ color: color }">{{ value }}</div>
          <div class="subtitle">{{ title }}</div>
        </div>
        <div>
          <v-icon class="icon" :style="{ color: color, opacity: 0.6 }">{{
            icon
          }}</v-icon>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  icon: string;
  color: string;
}>();
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.text-content {
  flex: 1;
}

.main-number {
  font-size: 2.125rem;
  color: white;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.875rem;
  color: white;
  opacity: 0.8;
  line-height: 1.4;
}

.icon {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
