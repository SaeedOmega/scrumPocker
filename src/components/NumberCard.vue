<script setup lang="ts">
defineProps({
  text: String,
  number: String
})
</script>

<template>
  <div
    class="min-w-30 h-30 flex justify-center items-center active:bg-[#94b6fb] rounded-10 border-white border-5 border-style-solid hover:cursor-pointer shadow-sm shadow-black font-500 text-4xl"
  >
    {{ text }}
  </div>
</template>
