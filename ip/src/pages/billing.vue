<template>
  <v-container class="py-8 px-6" fluid>
    <h1>Billing</h1>
    <p>Upravljajte svojim stanjem računa</p>
    <v-container grid-list-xs />

    <v-card>
      <v-card-item>
        <v-card-title>Stanje računa: </v-card-title>
        <v-card-subtitle> {{ billingStore.balance }} $</v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-container grid-list-xs />

    <v-card>
      <v-card-item>
        <v-card-title>Dopuni stanje</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-form>
          <v-text-field label="Kolicina" variant="outlined" v-model="amount" />
        </v-form>
        <v-btn block color="primary" @click="addBalance">Dopuni</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useBillingStore } from "@/stores/billingStore";

const billingStore = useBillingStore();
const amount = ref(0);

onMounted(() => {
  billingStore.getBalance();
});

const addBalance = async () => {
  await billingStore.addBalance(amount.value);
};
</script>
