<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import ExpenseList from '@/components/ExpenseList.vue'

const budget = ref<string>(localStorage.getItem('budget') || '')
const budgetSetted = ref<boolean>(localStorage.getItem('budgetSetted') || false)
const newExpense = ref<string>("")
const newPrice = ref<string>('')
const expenses = ref<Expense[]>([
  {
    id: 1,
    expense: "Rent",
    cost: 1200,
  },
  {
    id: 2,
    expense: "Groceries",
    cost: 300,
  },
  {
    id: 3,
    expense: "Utilities",
    cost: 150,
  },
  {
    id: 4,
    expense: "Internet",
    cost: 50,
  },
  {
    id: 5,
    expense: "Transportation",
    cost: 100,
  }
])

function checkDigit(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', '.', ',']
  if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
    event.preventDefault()
  }
}

function handleSubmit() {
  const parsedBudget = parseFloat(budget.value.replace(',', '.'))
  if (!isNaN(parsedBudget)) {
    budgetSetted.value = true
    budget.value = parsedBudget.toFixed(2)
    localStorage.setItem('budget', budget.value)
    localStorage.setItem('budgetSetted', budgetSetted.value)
  }
}

function AddNewExpense() {
  if (newExpense.value.trim() !== "" && newPrice.value.trim() !== "") {
    const parsedPrice = parseFloat(newPrice.value.replace(',', '.'))
    if (!isNaN(parsedPrice)) {
      expenses.value.push({
        id: expenses.value.length + 1,
        expense: newExpense.value,
        cost: parsedPrice
      })
      newExpense.value = ""
      newPrice.value = ""
    }
  }
}

function cleanLS(event: any) {
  event.preventDefault()
  localStorage.removeItem('budget')
  localStorage.removeItem('budgetSetted')
  location.reload()
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center px-5">
    <div v-if="!budgetSetted" class="w-full flex flex-col gap-5">
      <div class="gap-4 flex flex-col">
        <Label>Budget</Label>
        <Input
          v-model="budget"
          type="text"
          inputmode="numeric"
          pattern="[0-9]+"
          @keydown="checkDigit"
          placeholder="Entrez votre budget" />
      </div>
      <Button v-if="budget === ''" disabled class="w-full">Valider</Button>
      <Button v-else type="submit" class="w-full" @click="handleSubmit">Valider</Button>
    </div>
    <div v-else class="w-full absolute top-20 flex flex-col justify-center items-center gap-20 px-5">
      <div class="flex flex-col justify-center items-center gap-8 w-full">
        <p class="text-3xl font-semibold">{{ budget }} €</p>
        <Button variant="destructive" @click="cleanLS" class="w-full">Logout</Button>
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
                  Save changes
                </Button>
                <Button v-else type="button" @click="AddNewExpense" class="w-full">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ExpenseList :expenses="expenses" />
    </div>
  </div>
</template>
