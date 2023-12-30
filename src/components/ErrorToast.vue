<script setup lang="ts">
const message = defineModel<string | null>()

function onOkClick() {
  message.value = null
}
</script>

<template>
  <div class="absolute h-screen w-screen flex z-20 justify-center items-center">
    <div class="bg-white rounded-2xl max-w-80 p-20 gap-10 flex flex-col">
      <div>{{ message }}</div>
      <button @click="onOkClick" class="bg-yellow-200 rounded-xl">Ok</button>
    </div>
  </div>
</template>
