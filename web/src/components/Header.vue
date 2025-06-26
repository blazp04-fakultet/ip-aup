<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
function gotoApp() {
  window.location.href = 'http://localhost:3000'
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <div
            class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span class="text-white font-bold text-lg">L</span>
          </div>
          <span class="text-xl font-bold text-white">LLMBridge</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#models" class="text-slate-300 hover:text-white transition-colors">Models</a>
          <a href="#pricing" class="text-slate-300 hover:text-white transition-colors">Pricing</a>
          <a href="#docs" class="text-slate-300 hover:text-white transition-colors">Docs</a>
          <button class="btn-primary">Get Started</button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-slate-300 hover:text-white">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" class="md:hidden py-4 border-t border-slate-800">
        <div class="flex flex-col space-y-4">
          <a href="#features" class="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#models" class="text-slate-300 hover:text-white transition-colors">Models</a>
          <a href="#pricing" class="text-slate-300 hover:text-white transition-colors">Pricing</a>
          <a href="#docs" class="text-slate-300 hover:text-white transition-colors">Docs</a>
          <button class="btn-primary w-full" @click="goToApp">Get Started</button>
        </div>
      </div>
    </nav>
  </header>
</template>
