<script setup lang="ts">
defineProps({
  name: String,
  point: String,
  type: String
})
</script>

<template>
  <div
    class="flex gap-5 w-full"
    :class="{
      'border-b border-white': type == 'header',
      'border-t border-white': type == 'result'
    }"
  >
    <div class="flex-grow m-3" :class="{ 'my-5': type != 'row' }">{{ name }}</div>
    <div class="w-1px bg-white"></div>
    <div class="w-1/4 m-3" :class="{ 'my-5': type != 'row', 'text-sm': point == 'I Dont Want' }">
      {{ point }}
    </div>
  </div>
</template>
