<template>
    <v-app>
      <v-main>
        <v-container fluid class="fill-height">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Sign Up</v-toolbar-title>
                </v-toolbar>
                
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="firstName"
                      :rules="nameRules"
                      label="First Name"
                      prepend-icon="mdi-account"
                      required
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="lastName"
                      :rules="nameRules"
                      label="Last Name"
                      prepend-icon="mdi-account"
                      required
                    ></v-text-field>
                    
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
                    
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Confirm Password"
                      prepend-icon="mdi-lock-check"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="signup"
                    block
                  >
                    Sign Up
                  </v-btn>
                </v-card-actions>
                
                <v-divider></v-divider>
                
                <v-card-text class="text-center">
                  <span>Already have an account?</span>
                  <v-btn
                    color="primary"
                    variant="text"
                    to="/auth/login"
                  >
                    Login
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
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  const nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length >= 2 || 'Name must be at least 2 characters',
  ]
  
  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ]
  
  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
  ]
  
  const confirmPasswordRules = [
    (v: string) => !!v || 'Please confirm your password',
    (v: string) => v === password.value || 'Passwords do not match',
  ]
  
  const signup = () => {
    if (valid.value) {
      // Ovdje dodaj signup logiku
      console.log('Signup:', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      })
      router.push('/auth/login')
    }
  }
  </script>
  
