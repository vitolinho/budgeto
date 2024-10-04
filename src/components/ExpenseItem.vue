<script setup lang="ts">
defineProps<{
  id: string
  expense: string
  cost: number
  quantity: string
}>()
</script>

<template>
  <div
    class="border flex justify-between items-center px-2 py-2 w-full rounded-md"
  >
    <p class="uppercase font-semibold text-ellipsis line-clamp-1">
      {{ quantity }}
      <span class="lowercase">x</span>
      {{ expense }}
    </p>
    <p>-{{ (cost * Number(quantity)).toFixed(2) }}€</p>
  </div>
</template>
