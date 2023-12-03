<script setup lang="ts">
defineProps({
  text: String,
  number: String
})
</script>

<template>
  <div
    class="min-w-20 h-20 flex justify-center items-center active:bg-[rgb(81,126,246)] rounded-10px border-white border-5 border-style-solid hover:cursor-pointer shadow-sm shadow-black font-500 text-4xl"
  >
    {{ text }}
  </div>
</template>
