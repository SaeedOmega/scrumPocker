<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref<string>('')

function submitButton(name: string): void {
  localStorage.name = name
  router.push('/')
}
</script>

<template>
  <div class="flex gap-5">
    <input
      type="text"
      class="bg-transparent border-white placeholder:text-gray-300 border-style-solid border-1 font-sans text-xl outline-none rounded-5 p-5 text-white"
      placeholder="Type Your Name..."
      v-model="name"
    />
    <input
      type="button"
      value="Submit"
      class="bg-transparent border-white border-style-solid border-1 font-sans text-xl rounded-5 p-5 text-white active:bg-[#94b6fb]"
      @click="submitButton(name)"
    />
  </div>
</template>
