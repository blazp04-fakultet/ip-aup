<template>
  <v-card
    class="mx-auto my-6 py-4 px-6"
    color="blue"
    elevation="16"
    max-width="400px"
    min-width="280px"
  >
    <v-card-item>
      <div class="content-wrapper">
        <div class="text-content">
          <div class="main-number">15,845</div>
          <div class="subtitle">Total request</div>
        </div>
        <div>
          <v-icon class="icon">mdi-chart-line</v-icon>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

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
