<template>
  <DetailsHeader v-if="data" :budget-name="data[0].name" />
  <div class="flex justify-center items-center px-5">
    <div
    v-if="data"
    class="w-full mt-10 sm:max-w-[600px] flex flex-col justify-center items-center gap-20"
    >
      <div class="flex flex-col justify-center items-center gap-8 w-full">
        <p class="text-3xl font-semibold">{{ remainingBudget?.toFixed(2) ?? '0.00' }} €</p>
        <p class="text-xl text-foreground/30">Total dépensé : {{ totalExpenses?.toFixed(2) ?? '0.00' }} €</p>
        <Sheet>
          <SheetTrigger as-child>
            <Button class="w-full mb-10">Ajouter une dépense</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader class="gap-20">
              <SheetTitle>Ajouter une dépense</SheetTitle>
              <div class="grid grid-cols-1 gap-10">
                <div class="grid gap-4 py-4">
                  <div class="flex flex-col items-start gap-4">
                    <Label for="depense" class="text-right"> Dépense </Label>
                    <Input v-model="newExpense" class="col-span-3" />
                  </div>
                  <div class="flex flex-col items-start gap-4">
                    <Label for="prix" class="text-right"> Prix </Label>
                    <Input
                      v-model="newPrice"
                      type="text"
                      pattern="[0-9]+"
                      @keydown="CheckDigit"
                      class="col-span-3"
                    />
                  </div>
                  <div class="flex flex-col items-start gap-4">
                    <Label for="quantity" class="text-right"> Quantity </Label>
                    <Input
                      v-model="newQuantity"
                      type="text"
                      inputmode="numeric"
                      pattern="[0-9]+"
                      @keydown="CheckDigit"
                      class="col-span-3"
                    />
                  </div>
                </div>
                <SheetClose :disabled="newExpense === '' || newPrice === ''">
                  <Button :disabled="newExpense === '' || newPrice === ''" class="w-full" @click="AddNewExpense">Ajouter dépense</Button>
                </SheetClose>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div v-if="data[0].expenses.length > 0" v-for="(expenses, date) in sortedExpenses" class="w-full">
        <p class="text-foreground/30 mb-2">{{ date }}</p>
        <ExpenseList :expenses="expenses" />
      </div>
      <div
        v-if="Object.keys(sortedExpenses).length > 1 || ThereIsMoreThen4Expenses"
        class="h-[200px] w-full flex justify-center items-start pt-10"
      >
        <p>&#169; Budgeto - Vitomir Laces, 2024</p>
      </div>
      <p v-if="data[0].expenses.length === 0">Mashallah tu n&apos;as rien dépensé</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import ExpenseList from '@/components/ExpenseList.vue'
import { Budgets } from '../types/budget.ts'
import { CheckDigit, SerializeDate, SortExpensesByDate } from '../utils/serializer.ts'
import DetailsHeader from '@/components/DetailsHeader.vue'
import { SortedExpenses } from '@/types/expense.ts'

const route = useRoute()

const data = ref<Budgets[]>()
const newExpense = ref<string>('')
const newPrice = ref<string>('')
const newQuantity = ref<string>('')

const sortedExpenses = ref<SortedExpenses>({})

// This calculate all the expenses costs
const totalExpenses = computed(() => {
  if (!data.value) return 0
  return data.value[0].expenses.reduce(
    (total, expense) => total + expense.cost * Number(expense.quantity),
    0
  )
})

// This calculate the initial budget minus the total expenses
const remainingBudget = computed(() => {
  if (!data.value) return 0
  const parsedBudget = parseFloat(data.value[0].budget)
  return isNaN(parsedBudget) ? 0 : parsedBudget - totalExpenses.value
})

const ThereIsMoreThen4Expenses = computed(() => {
  return Object.values(sortedExpenses.value).some((el) => el.length > 4)
})

onMounted(() => {
  const ls = localStorage.getItem('budgets')
  if (!ls) return
  data.value = JSON.parse(ls).filter((budget: Budgets) => {
    return budget.id === route.params.id
  })
  if (!data.value) return
  sortedExpenses.value = SortExpensesByDate(data.value[0].expenses)
})

function AddNewExpense() {
  if (!data.value) return
  if (newExpense.value.trim() !== '' && newPrice.value.trim() !== '') {
    const parsedPrice = parseFloat(newPrice.value.replace(',', '.'))
    if (!isNaN(parsedPrice)) {
      data.value[0].expenses.push({
        id: crypto.randomUUID(),
        expense: newExpense.value,
        cost: parsedPrice,
        quantity: newQuantity.value === '' ? '1' : newQuantity.value,
        date: SerializeDate(new Date())
      })
      const ls = localStorage.getItem('budgets')
      if (ls) {
        const budgetsFromLS = JSON.parse(ls)
        const budgetIndex = budgetsFromLS.findIndex((budget: Budgets) => budget.id === route.params.id)
        if (budgetIndex !== -1) {
          budgetsFromLS[budgetIndex].expenses = data.value[0].expenses
          localStorage.setItem('budgets', JSON.stringify(budgetsFromLS))
          newExpense.value = ''
          newPrice.value = ''
          newQuantity.value = ''
          sortedExpenses.value = SortExpensesByDate(data.value[0].expenses)
        }
      }
    }
  }
}
</script>
