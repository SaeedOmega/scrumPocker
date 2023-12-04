<script setup lang="ts">
import { onDelete } from '../server.telefunc'

defineProps<{
  text: string | null
}>()
const emit = defineEmits(['text2'])

async function handleBack() {
  await onDelete(localStorage.name)
  emit('text2', null)
}
</script>

<template>
  <div @click="handleBack()" class="absolute flex justify-center items-center h-screen w-screen">
    <div
      @click.stop.prevent
      class="min-w-20 select-none bg-[rgb(172,192,246)] h-20 transform scale-400 flex justify-center items-center rounded-10px border-white border-5 border-style-solid hover:cursor-pointer shadow-sm shadow-black font-500 text-4xl"
    >
      {{ text }}
    </div>
  </div>
</template>
