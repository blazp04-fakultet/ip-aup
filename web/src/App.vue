<script setup lang="ts">
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Models from './components/Models.vue'
import Pricing from './components/Pricing.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-900">
    <div class="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animate-gradient-x"></div>

    <div class="relative z-10">
      <Header />
      <Hero />
      <Features />
      <Models />
      <Pricing />
      <Footer />
    </div>
  </div>
</template>