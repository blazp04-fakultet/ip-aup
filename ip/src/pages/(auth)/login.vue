<template>
    <v-app>
      <v-main>
        <v-container fluid class="fill-height">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      prepend-icon="mdi-email"
                      type="email"
                      required
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      prepend-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="login"
                    block
                  >
                    Login
                  </v-btn>
                </v-card-actions>
                
                <v-divider></v-divider>
                
                <v-card-text class="text-center">
                  <span>Don't have an account?</span>
                  <v-btn
                    color="primary"
                    variant="text"
                    to="/auth/signup"
                  >
                    Sign Up
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">

  
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  


  const router = useRouter()
  
  const valid = ref(false)
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ]
  
  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
  ]
  
  const login = () => {
    if (valid.value) {
      // Ovdje dodaj login logiku
      console.log('Login:', { email: email.value, password: password.value })
      router.push('/')
    }
  }
  </script>
  
  <route lang="yaml">
  meta:
    layout: false
  </route>