<template>
  <div class="flex justify-center items-center px-5">
    <div v-if="!budgetSetted" class="w-full h-screen flex flex-col justify-center items-center">
      <div class="w-full sm:max-w-[600px] flex flex-col gap-5">
        <div class="gap-4 flex flex-col">
          <Label>Budget</Label>
          <Input
            v-model="budget"
            type="text"
            pattern="[0-9]+"
            @keydown="checkDigit"
            placeholder="Entrez votre budget" />
        </div>
        <Button v-if="budget === ''" disabled class="w-full">Valider</Button>
        <Button v-else type="submit" class="w-full" @click="ValidateInitialBudget">Valider</Button>
      </div>
    </div>
    <div v-else class="w-full mt-20 sm:max-w-[600px] flex flex-col justify-center items-center gap-20 px-5">
      <div class="flex flex-col justify-center items-center gap-8 w-full">
        <p class="text-3xl font-semibold">{{ remainingBudget }} €</p>
        <Button variant="destructive" @click="cleanLS" class="w-full">Supprimer le budget en cours</Button>
        <Dialog>
          <DialogTrigger as-child>
            <Button class="w-full">
              Ajouter une dépense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une dépense</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="flex flex-col items-start gap-4">
                <Label for="depense" class="text-right">
                  Dépense
                </Label>
                <Input v-model="newExpense" class="col-span-3" />
              </div>
              <div class="flex flex-col items-start gap-4">
                <Label for="prix" class="text-right">
                  Prix
                </Label>
                <Input
                  v-model="newPrice"
                  type="text"
                  pattern="[0-9]+"
                  @keydown="checkDigit"
                  class="col-span-3"
                />
              </div>
              <div class="flex flex-col items-start gap-4">
                <Label for="quantity" class="text-right">
                  Quantity
                </Label>
                <Input
                  v-model="newQuantity"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]+"
                  @keydown="checkDigit"
                  class="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose as-child>
                <Button
                  v-if="newExpense === '' || newPrice === ''"
                  disabled
                  class="w-full"
                >
                  Ajouter dépense
                </Button>
                <Button v-else type="button" @click="AddNewExpense" class="w-full">
                  Ajouter dépense
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ExpenseList v-if="expenses.length > 0" :expenses="expenses" />
      <p v-else>Mashallah tu n&apos;as rien dépensé</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Expense } from '@/types/expense.ts'
import ExpenseList from '@/components/ExpenseList.vue'

// this is user initial budget
const budget = ref<string>(localStorage.getItem('budget') || '')
// this is a boolean that says if user setted or not his initial budget
const budgetSetted = ref<string | boolean>(localStorage.getItem('budgetSetted') || false)
// This is a ref for this expense input
const newExpense = ref<string>("")
// This is a ref for this price input
const newPrice = ref<string>('')
// This is a ref for this quantity input
const newQuantity = ref<string>('')
// This is a ref of the expenses 
const expenses = ref<Expense[]>([])
// This is stored expenses 
const storedExpenses = localStorage.getItem('expenses')

// Apply all stored expenses and apply them to expenses's ref
onMounted(() => {
  if (storedExpenses) {
    try {
      expenses.value = JSON.parse(storedExpenses)
    } catch (error) {
      console.error('Invalid expenses data in localStorage', error)
    }
  }
})

// This calculate all the expenses costs
const totalExpenses = computed(() => {
  return expenses.value.reduce((total, expense) => total + expense.cost * Number(expense.quantity), 0)
})

// This calculate the initial budget minus the total expenses
const remainingBudget = computed(() => {
  const parsedBudget = parseFloat(budget.value)
  return isNaN(parsedBudget) ? 0 : parsedBudget - totalExpenses.value
})

// This function is checking if the user is entering a digit or not
function checkDigit(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', '.', ',']
  if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
    event.preventDefault()
  }
}

// This function validate and set the initial budget of the use
function ValidateInitialBudget() {
  const parsedBudget = parseFloat(budget.value.replace(',', '.'))
  if (!isNaN(parsedBudget)) {
    budgetSetted.value = true
    budget.value = parsedBudget.toFixed(2)
    localStorage.setItem('budget', budget.value)
    localStorage.setItem('budgetSetted', budgetSetted.value.toString())
  }
}

// This function handle the adding of a new expense
function AddNewExpense() {
  if (newExpense.value.trim() !== "" && newPrice.value.trim() !== "") {
    const parsedPrice = parseFloat(newPrice.value.replace(',', '.'))
    if (!isNaN(parsedPrice)) {
      expenses.value.push({
        id: expenses.value.length + 1,
        expense: newExpense.value,
        cost: parsedPrice,
        quantity: newQuantity.value === '' ? '1' : newQuantity.value
      })
      localStorage.setItem('expenses', JSON.stringify(expenses.value))
      newExpense.value = ""
      newPrice.value = ""
      newQuantity.value = ""
    }
  }
}

// This function clean the local storage and permits to users to create new inital budget
function cleanLS(event: any) {
  event.preventDefault()
  localStorage.removeItem('budget')
  localStorage.removeItem('budgetSetted')
  localStorage.removeItem('expenses')
  location.reload()
}

// This watcher is setting expenses to localStorage if there are new expenses
watch(expenses, (newExpenses) => {
  localStorage.setItem('expenses', JSON.stringify(newExpenses))
})
</script>
