<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import minionImage from '../assets/loginMinionsImage.png'

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (localStorage.name) {
      next('/')
      return
    }
    next()
  }
})

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
  <div class="flex flex-col flex-grow gap-10 justify-center items-center">
    <div class="font-Knewave mb-70px self-center mb-20 m-13 text-center text-xl select-none">
      ScrumPocker
    </div>
    <div class="font-light text-24px">Enter Your name</div>
    <div class="font-light text-12px">Type 'result' for reset option in resultPage</div>
    <form @submit.prevent="login(name)" class="flex flex-col items-start justify-center">
      <label for="name" class="text-12px opacity-60">Your name</label>
      <div class="h-7 flex gap-2 border-b-black border-b">
        <input
          id="name"
          type="text"
          class="bg-transparent h-full placeholder:text-[rgba(9,9,9,0.4)] outline-none px-2"
          placeholder="name"
          v-model="name"
          autofocus
        />
        <button
          type="button"
          :class="{ invisible: name == '' }"
          class="bg-transparent h-full rounded-md active:bg-[#94b6fb]"
          @click="login(name)"
        >
          Submit
        </button>
      </div>
    </form>
    <img :src="minionImage" alt="minions" width="200" />
  </div>
</template>
