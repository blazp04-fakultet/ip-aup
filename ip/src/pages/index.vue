<template>
  <v-container class="py-8 px-6" fluid>
    <v-row jalign="center">
      <template v-for="card in cards" :key="card">
        <AppStatisticsCard />
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
let cards = ["syas", "syas", "syas", "syas"];
</script>
