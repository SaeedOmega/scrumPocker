<script setup lang="ts">
defineProps({
  text: String,
  number: String
})
</script>

<template>
  <div
    :class="[number == text ? 'bg-[#d2e1ff]' : '']"
    class="min-w-35 h-35 flex justify-center items-center rounded-10 border-white border-5 border-style-solid hover:bg-[#94b6fb] hover:cursor-pointer shadow-sm shadow-black font-500 text-4xl"
  >
    {{ text }}
  </div>
</template>
