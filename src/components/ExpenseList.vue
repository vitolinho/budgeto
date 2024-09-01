<script setup lang="ts">
import ExpenseItem from '@/components/ExpenseItem.vue'
import { Expense } from '@/types/expense.ts'
defineProps<{
  expenses: Expense[]
}>()
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center gap-5">
    <ExpenseItem
      v-for="(expense) in expenses"
      :expense="expense.expense"
      :cost="expense.cost"
      :quantity="expense.quantity"
      :id="expense.id"
      :key="expense.id"
    />
    <div v-if="expenses.length > 4" class="h-[200px] w-full flex justify-center items-start pt-10">
      <p>&#169; Budgeto - Vitomir Laces, 2024</p>
    </div>
  </div>
</template>
