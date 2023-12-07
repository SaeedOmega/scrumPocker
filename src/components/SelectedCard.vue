<script setup lang="ts">
import { onDelete } from '../server.telefunc'

const text = defineModel<string | null>()

/**
 * delete this user from average table
 * close pointCard
 */
async function handleBack() {
  await onDelete(localStorage.name)
  text.value = null
}
</script>

<template>
  <div @click="handleBack()" class="absolute flex justify-center items-center h-screen w-screen">
    <div
      @click.stop.prevent
      :class="[
        text != 'I Cant' ? 'scale-400' : 'scale-250',
        text != 'I Dont Want' ? 'scale-400' : 'scale-150'
      ]"
      class="min-w-20 p-3 select-none bg-[rgb(172,192,246)] h-20 transform flex justify-center items-center rounded-10px border-white border-5 border-style-solid hover:cursor-pointer shadow-sm shadow-black font-500 text-4xl"
    >
      {{ text }}
    </div>
  </div>
</template>
