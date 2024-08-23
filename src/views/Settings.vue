<template>
  <div class="w-full h-screen flex flex-col justify-center items-center px-5 gap-20">
    <label class="w-full flex justify-between items-center">Mode <ModeToggle /></label>
    <label class="w-full flex items-center gap-20">Theme <ThemeToggle /></label>
  </div>
</template>

<script setup lang="ts">
import ModeToggle from '../components/ModeToggle.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
</script>
