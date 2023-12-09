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
    <img :src="text ? text : ''" alt="" />
  </div>
</template>
