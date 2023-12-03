<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const route = useRouter()

if (!localStorage.name) {
  route.push('/login')
}
</script>

<template>
  <div
    class="w-screen h-screen bg-[rgb(172,192,246)] flex flex-col gap-10 justify-center items-center font-sans"
  >
    <RouterView />
  </div>
</template>
