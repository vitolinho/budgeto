<template>
  <div class="flex flex-col items-center justify-center px-5">
    <div class="w-full mt-20 sm:max-w-[600px] flex flex-col justify-center items-center gap-20">
      <h1 class="text-3xl font-semibold">Budgeto</h1>
      <Sheet>
        <SheetTrigger as-child>
          <Button class="w-full mb-10">Ajouter un budget</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader class="gap-20">
            <SheetTitle>Ajouter un budget</SheetTitle>
            <div class="grid grid-cols-1 gap-10">
              <div class="flex flex-col items-start gap-4">
                <Label>Nom</Label>
                <Input
                v-model="newName"
                type="text"
                class="col-span-3"
                placeholder="Entrez le nom du budget"
                />
              </div>
              <div class="flex flex-col items-start gap-4">
                <Label>Budget</Label>
                <Input
                  v-model="budget"
                  type="text"
                  pattern="[0-9]+"
                  @keydown="CheckDigit"
                  placeholder="Entrez votre budget"
                />
              </div>
              <SheetClose :disabled="!nameAndBugetOK">
                <Button :disabled="!nameAndBugetOK" class="w-full" @click="AddNewBudget">Ajouter votre budget</Button>
              </SheetClose>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div class="grid grid-cols-1 gap-10 w-full">
        <p class="font-semibold">Vos budgets</p>
        <div v-if="BUDGETS" class="grid grid-cols-1 gap-5">
          <div v-for="budget in BUDGETS" :key="budget.id">
            <div class="flex border justify-between items-center p-2 rounded-md">
              <RouterLink :to="`/${budget.id}`" class="flex flex-col gap-2 w-full">
                <p class="font-semibold">{{ budget.name }}</p>
                <p class="text-foreground/60">{{ (Number(budget.budget) - getTotalExpenses(budget)).toFixed(2) }} €</p>
              </RouterLink>
              <Dialog>
                <DialogTrigger as-child>
                  <div class="p-2 hover:cursor-pointer">
                    <Icon icon="mdi:delete" class="text-red-500 "/>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader class="flex justify-center items-center">
                    <DialogTitle class="w-[280px] text-center leading-8">Êtes vous sur de vouloir supprimer le budget <span class="text-primary">{{ budget.name }}</span> ?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter class="grid grid-cols-1 gap-5">
                    <DialogClose as-child>
                      <Button variant="destructive" class="w-full" @click="deleteBudget(budget.id)">Oui</Button>
                    </DialogClose>
                    <DialogClose as-child>
                      <Button variant="outline" class="w-full">Non</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div
          v-if="BUDGETS.length > 1"
          class="h-[200px] w-full flex justify-center items-start pt-10"
        >
          <p>&#169; Budgeto - Vitomir Laces, 2024</p>
        </div>
        <div v-if="BUDGETS.length === 0" class="grid grid-cols-1 gap-2">
          <p>Vous avez aucun budget pour le moment ...</p>
          <p>Nous vous invitons à en vous en créez un.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckDigit } from '@/utils/serializer'
import { Budgets } from '../types/budget.ts'
import { Icon } from "@iconify/vue"

const BUDGETS = ref<Budgets[]>([])
const newName = ref<string>('')
const budget = ref<string>('')

const nameAndBugetOK = computed(() => newName.value.trim() !== '' && budget.value.trim() !== '')

onMounted(async () => {
  const ls = localStorage.getItem('budgets')
  if (!ls) return
  BUDGETS.value = JSON.parse(ls)
})

const AddNewBudget = () => {
  if (newName.value.trim() !== '' && budget.value.trim() !== '') {
    const parsedBudget = parseFloat(budget.value.replace(',', '.'))
    BUDGETS.value.push({
      "id": crypto.randomUUID(),
      "name": newName.value,
      "budget": parsedBudget.toFixed(2),
      "expenses": []
    })
    localStorage.setItem('budgets', JSON.stringify(BUDGETS.value))
    newName.value = ''
    budget.value = ''
  }
}

const deleteBudget = (id: string) => {
  setInterval(() => {
    BUDGETS.value = BUDGETS.value.filter(
      (budget: Budgets) => budget.id !== id 
    )
    localStorage.setItem('budgets', JSON.stringify(BUDGETS.value))
  }, 1500)
}

const getTotalExpenses = (budget: Budgets) => {
  return budget.expenses.reduce(
    (total, expense) => total + expense.cost * Number(expense.quantity),
    0
  )
}
</script>
