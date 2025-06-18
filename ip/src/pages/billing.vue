<template>
  <v-container class="py-8 px-6" fluid>
    <h1>Billing</h1>
    <p>Upravljajte svojim stanjem računa</p>
    <v-container grid-list-xs />

    <v-card>
      <v-card-item>
        <v-card-title>Stanje računa: </v-card-title>
        <v-card-subtitle> 15,845 KM</v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-container grid-list-xs />

    <v-card>
      <v-card-item>
        <v-card-title>Dopuni stanje</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-form>
          <v-text-field label="Kolicina" variant="outlined" />
        </v-form>
        <v-btn block color="primary">Dopuni</v-btn>
      </v-card-text>
    </v-card>

  </v-container>
</template>
