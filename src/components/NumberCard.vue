<script setup lang="ts">
defineProps({
  src: String
})
</script>

<template>
  <img class="h-150px w-94px" :src="src" />
</template>
