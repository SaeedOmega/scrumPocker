<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref<string>('')

// #region login and save name in localStorage
function submitButton(name: string): void {
  localStorage.name = name
  router.push('/')
}
// #endregion
</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-center gap-10 items-center">
    <form @submit.prevent="submitButton(name)" class="flex gap-5 justify-center">
      <input
        type="text"
        class="bg-transparent border-white w-[60%] shadow-sm shadow-gray-600 placeholder:text-[rgba(999,999,999,0.5)] rounded-xl border-style-solid border-2 font-sans text-xl outline-none rounded-5 p-5 text-white"
        placeholder="Type Your Name..."
        v-model="name"
        autofocus
      />
      <button
        type="button"
        class="bg-transparent rounded-xl border-white shadow-sm shadow-gray-600 border-style-solid border-2 font-sans text-xl rounded-5 p-5 text-white active:bg-[#94b6fb]"
        @click="submitButton(name)"
      >
        Submit
      </button>
    </form>
  </div>
</template>
