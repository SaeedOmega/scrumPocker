<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bgColor min-h-screen overflow-auto flex flex-col flex-grow font-roboto">
    <RouterView />
  </div>
</template>

<style>
.bgColor {
  background: radial-gradient(87.75% 87.75% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%),
    #ffcf55;
}
</style>
