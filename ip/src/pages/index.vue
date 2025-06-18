<template>
  <div class="py-5   px-6">
    <div>
      <h1>Kontrolna ploča</h1>
      <p>Dobrodošli nazad!</p>
    </div>
    <v-container class="py-8 px-6" fluid>
      <v-row jalign="center">
        <template v-for="card in cards" :key="card">
          <AppStatisticsCard />
        </template>
      </v-row>
    </v-container>
    <div class="details-section">

      <ModelUsage class="model-usage" />
      <ModelUsage class="model-usage" />
    </div>
  </div>

</template>

<script setup lang="ts">
const cards = ["syas", "s", "d", "f"];
</script>

<style>
.details-section {
  display: flex;
}

.model-usage {
  flex: 1;
  margin-left: 20px;
}
</style>
