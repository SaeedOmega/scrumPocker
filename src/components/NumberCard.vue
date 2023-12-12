<script setup lang="ts">
defineProps<{
  src: string
  value: string
}>()
</script>

<template>
  <div
    class="text-white h-140px w-84px bg-no-repeat font-bold pt-3 text-30px bg-contain text-center bg-origin-border"
    :style="{ backgroundImage: `url(${src})` }"
  >
    {{ value }}
  </div>
</template>

<style>
.bg {
  background-image: src;
}
</style>
