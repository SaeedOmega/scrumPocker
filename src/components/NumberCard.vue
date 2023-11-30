<script setup lang="ts">
defineProps({
  text: String
})
</script>

<template>
  <div
    class="w-23 h-23 flex justify-center items-center rounded-15px border-white border-2 border-style-solid hover:bg-[#94b6fb] active:bg-[#d2e1ff] shadow-sm shadow-black font-500 text-4xl"
  >
    {{ text }}
  </div>
</template>
