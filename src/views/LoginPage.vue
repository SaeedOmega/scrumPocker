<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref<string>('')

/**
 *
 * set localStorage with user input
 * 
 * @param name string data
 * 
 * @returns void
 *
 */
function login(name: string): void {
  localStorage.name = name
  router.push('/')
}
</script>

<template>
  <div class=" w-screen flex flex-col justify-center items-center">
    <form @submit.prevent="login(name)" class="flex gap-5 justify-center">
      <input
        type="text"
        class="bg-transparent border-white w-6/10 shadow-sm shadow-gray-600 placeholder:text-[rgba(9,9,9,0.4)] rounded-xl border-style-solid border-2 font-sans text-xl outline-none rounded-5 p-5 text-white"
        placeholder="Type Your Name..."
        v-model="name"
        autofocus
      />
      <button
        type="button"
        class="bg-transparent rounded-xl border-white shadow-sm shadow-gray-600 border-style-solid border-2 font-sans text-xl rounded-5 p-5 text-white active:bg-[#94b6fb]"
        @click="login(name)"
      >
        Submit
      </button>
    </form>
  </div>
</template>
