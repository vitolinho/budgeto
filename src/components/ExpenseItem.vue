<script setup lang="ts">
import { Coins } from 'lucide-vue-next'
defineProps<{
  id: number
  expense: string
  cost: number
  quantity: string
}>()
</script>

<template>
  <div
    class="border flex justify-between items-center px-2 py-2 w-full rounded-md"
  >
    <div class="flex gap-3 items-center">
      <Coins />
      <p class="uppercase font-semibold">
        {{ expense }}
        <span class="lowercase">x</span>
        {{ quantity }}
      </p>
    </div>
    <p>-{{ (cost * Number(quantity)).toFixed(2) }}€</p>
  </div>
</template>
