<template>
  <v-container class="py-8 px-6" fluid>
    <div class="heading-section">
      <div>
        <h1>API Keys</h1>
        <p>Menange your API keys here</p>
      </div>
      <div>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="dialog = true">
          Add new key
        </v-btn>
      </div>
    </div>
    <v-alert
      type="info"
      class="mb-4 mt-12"
      dense
      prominent
      icon="mdi-lock"
      variant="tonal"
    >
      <strong>Security Notice</strong><br />
      Your API keys are stored securely and encrypted. Only the last 4
      characters are displayed for security purposes.
    </v-alert>

    <template v-for="apiKey in tokenStore.apiKeys">
      <ApiKeyCard :token="apiKey" />
    </template>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Api key name</v-card-title>
        <v-card-text>
          <v-text-field v-model="keyName" label="Key name" />
          <v-card-text v-if="tokenStore.newApiKey !== ''">
            <span class="text-subtitle-1">API Key: </span>
            <span class="text-caption">{{ tokenStore.newApiKey }}</span>
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addNewApiKey">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { useTokeStore } from "@/stores/tokenStore";
import { ref } from "vue";

const tokenStore = useTokeStore();
const dialog = ref(false);
const keyName = ref("");

onMounted(async () => {
  await tokenStore.getApiKeys();
});

const addNewApiKey = async () => {
  await tokenStore.addNewApiKey(keyName.value);
};
</script>

<style>
.heading-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
