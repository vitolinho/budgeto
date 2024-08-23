<template>
  <Router />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Router from './router/Router.vue'
import setGlobalColorTheme from './utils/theme-color'

// Apply stored app theme
onMounted(() => {
  let themeMode = localStorage.getItem('vueuse-color-scheme')
  const themeColor = localStorage.getItem('theme-color')
  if (themeMode === 'auto') {
    themeMode = 'light'
  }
  if (themeColor && (themeMode === 'light' || themeMode === 'dark')) {
    setGlobalColorTheme(themeMode, themeColor)
  } else if(!themeColor && themeMode === 'dark') {
    setGlobalColorTheme(themeMode, 'green')
  }
})
</script>
