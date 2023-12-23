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
    :style="{
      backgroundImage: `url(${backgroundImageSrc})`,
      fontVariationSettings: `'DSTY' 0,'KSHD' 100,'wght' 700`
    }"
    :class="{ 'font-roboto': value === '∞' }"
  >
    {{ value }}
  </div>
</template>
