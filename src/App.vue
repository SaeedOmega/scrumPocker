<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen h-screen saeed font-sans">
    <RouterView />
  </div>
</template>

<style>
.saeed {
  background: radial-gradient(87.75% 87.75% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%),
    #ffcf55;
}
</style>
