<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center px-5 gap-20"
  >
    <label class="w-full flex justify-between items-center"
      >Mode <ModeToggle
    /></label>
    <label class="w-full flex items-center gap-20">Theme <ThemeToggle /></label>
    <div class="w-full flex justify-between items-center">
      <p class="text-red-500">Danger Zone</p>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="destructive">Supprimer toutes vos données</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader class="flex justify-center items-center">
            <DialogTitle class="w-[280px] text-center leading-8">Êtes vous sur de vouloir supprimer toutes vos données ?</DialogTitle>
          </DialogHeader>
          <DialogFooter class="grid grid-cols-1 gap-5">
            <DialogClose as-child>
              <Button variant="destructive" class="w-full" @click="deleteUserData">Oui</Button>
            </DialogClose>
            <DialogClose as-child>
              <Button variant="outline" class="w-full">Non</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
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
import ModeToggle from '../components/ModeToggle.vue'
import ThemeToggle from '../components/ThemeToggle.vue'

const deleteUserData = (event: any) => {
  event.preventDefault()
  localStorage.removeItem('budget')
  localStorage.removeItem('budgetSetted')
  localStorage.removeItem('expenses')
  localStorage.removeItem('budgets')
  location.reload()
}
</script>
