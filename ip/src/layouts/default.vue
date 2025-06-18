<template>
  <v-app id="inspire">
   

    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="route"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
   
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const links = [
  ['mdi-home', 'Home', '/'],
  ['mdi-key-variant', 'Api key', '/token'],
 
]

const drawer = ref<boolean>(true) 
</script>