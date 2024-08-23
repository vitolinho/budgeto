<template>
  <div class="w-full fixed bottom-0 border-t px-20 py-2 flex justify-between items-center bg-background">
    <RouterLink to="/">
      <div :class="[$route.fullPath === '/' && 'text-primary', 'flex flex-col gap-2 items-center justify-center']">
        <Icon icon="mdi:euro" class="size-6" />
        <p class="text-sm">Accueil</p>
      </div>
    </RouterLink>
    <RouterLink to="/settings">
      <div :class="[$route.fullPath === '/settings' && 'text-primary', 'flex flex-col gap-2 items-center justify-center']">
        <Icon icon="mdi:settings" class="size-6" />
        <p class="text-sm">Paramètres</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
