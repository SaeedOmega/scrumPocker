<script setup lang="ts">
defineProps<{
  //backgroundImageAddress for Each Number
  backgroundImageSrc: string
  // value of each Number Card
  value: string
}>()
</script>

<template>
  <div
    class="text-white h-130px w-84px font-bold pt-3 text-30px bg-contain text-center select-none bg-origin-border"
    :style="{ backgroundImage: `url(${backgroundImageSrc})` }"
  >
    {{ value }}
  </div>
</template>
