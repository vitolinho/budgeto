<template>
  <Select v-model="themeColor">
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="zinc">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-zinc-700 rounded-full"></div>
            <span>Zinc</span>
          </div>
        </SelectItem>
        <SelectItem value="rose">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-rose-700 rounded-full"></div>
            <span>Rose</span>
          </div>
        </SelectItem>
        <SelectItem value="blue">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-blue-700 rounded-full"></div>
            <span>Blue</span>
          </div>
        </SelectItem>
        <SelectItem value="green">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-green-700 rounded-full"></div>
            <span>Green</span>
          </div>
        </SelectItem>
        <SelectItem value="orange">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-orange-700 rounded-full"></div>
            <span>Orange</span>
          </div>
        </SelectItem>
        <SelectItem value="red">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-red-700 rounded-full"></div>
            <span>Red</span>
          </div>
        </SelectItem>
        <SelectItem value="slate">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-slate-700 rounded-full"></div>
            <span>Slate</span>
          </div>
        </SelectItem>
        <SelectItem value="stone">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-stone-700 rounded-full"></div>
            <span>Stone</span>
          </div>
        </SelectItem>
        <SelectItem value="gray">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-gray-700 rounded-full"></div>
            <span>Gray</span>
          </div>
        </SelectItem>
        <SelectItem value="yellow">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-yellow-700 rounded-full"></div>
            <span>Yellow</span>
          </div>
        </SelectItem>
        <SelectItem value="violet">
          <div class="flex gap-3 items-center">
            <div class="size-3 bg-violet-700 rounded-full"></div>
            <span>Violet</span>
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import setGlobalColorTheme from '../utils/theme-color.ts'

const themeColor = ref(localStorage.getItem('theme-color') || 'slate')

watch(themeColor, (newThemeColor) => {
  localStorage.setItem('theme-color', newThemeColor)
  let themeMode = localStorage.getItem('vueuse-color-scheme')
  if (themeMode === 'auto') {
    themeMode = 'light'
  }
  if (themeMode === 'light' || themeMode === 'dark') {
    setGlobalColorTheme(themeMode, newThemeColor)
  }
})
</script>
