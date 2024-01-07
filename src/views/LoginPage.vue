<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import minionImage from '../assets/loginMinionsImage.png'

// defineOptions({
//   beforeRouteEnter(to, from, next) {
//     if (localStorage.name) {
//       next('/')
//       return
//     }
//     next()
//   }
// })

const router = useRouter()
const name = ref<string>('')
const roomName = ref<string>('')

/**
 *
 * set localStorage with user input
 *
 * @param name string data
 *
 * @returns void
 *
 */
function login(name: string, room: string): void {
  localStorage.name = name
  localStorage.room = room
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col flex-grow gap-8 justify-center items-center">
    <div class="font-Knewave mb-70px self-center text-center text-xl select-none">ScrumPocker</div>
    <div class="font-light text-24px">Enter Your name</div>
    <div class="font-light text-12px">Type 'result' for reset option in resultPage</div>
    <form @submit.prevent="login(name, roomName)" class="flex flex-col items-center justify-center">
      <label for="name" class="text-12px self-start opacity-60">Your name</label>
      <input
        id="name"
        type="text"
        class="bg-transparent mb-5 border-b-black border-b h-full placeholder:text-[rgba(9,9,9,0.4)] outline-none px-2"
        placeholder="name"
        v-model="name"
        autofocus
      />
      <label for="name" class="text-12px self-start opacity-60">Your room</label>
      <input
        id="name"
        type="text"
        class="bg-transparent border-b-black border-b h-full placeholder:text-[rgba(9,9,9,0.4)] outline-none px-2"
        placeholder="Room Name"
        v-model="roomName"
        autofocus
      />
      <button
        :class="{ invisible: !name }"
        class="bg-gradient-to-b text-white from-[#514647] via-[#6c6363] to-transparent py-3 px-10 rounded-80px h-full mt-10 rounded-md active:bg-[#94b6fb]"
      >
        Submit
      </button>
    </form>
    <img :src="minionImage" alt="minions" width="200" height="323" />
  </div>
</template>
