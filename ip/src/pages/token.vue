<script setup lang="ts">
import ApiKeyCard from '@/components/ApiKeyCard.vue';

</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <div class="heading-section">
      <div>
        <h1>API Keys</h1>
        <p>Menange your API keys here</p>
      </div>
      <div>
        <v-btn color="primary" prepend-icon="mdi-plus">
          Add new key
        </v-btn>
      </div>

    </div>
    <v-alert type="info" class="mb-4 mt-12" dense prominent icon="mdi-lock" variant="tonal">
      <strong>Security Notice</strong><br>
      Your API keys are stored securely and encrypted. Only the last 4 characters are displayed for security purposes.
    </v-alert>

    <ApiKeyCard />
  </v-container>
</template>

<style>
.heading-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
