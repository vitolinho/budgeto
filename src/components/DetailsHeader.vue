<template>
  <div class="w-full flex justify-between items-center bg-primary sticky top-0">
    <div class="p-3 w-fit hover:cursor-pointer">
      <Icon icon="mdi:arrow-back" class="size-6 text-primary-foreground" @click="$router.back()"/>
    </div>
    <p class="text-lg text-primary-foreground capitalize truncate text-left">{{ budgetName }}</p>
    <div class="p-3 w-fit">
      <Icon icon="mdi:arrow-back" class="size-6 text-primary"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  budgetName: string
}>()
</script>
