<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const route = useRouter()

if (!localStorage.name) {
  route.push('/login')
}
</script>

<template>
  <div
    class="w-screen h-screen bg-[#4f80e3] flex flex-col gap-10 justify-center items-center font-sans"
  >
    <RouterView />
  </div>
</template>
