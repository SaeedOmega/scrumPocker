<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { setPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'

const number = ref<string | null>(null)
const name = ref<string>('')
const list = ref<Map<string, number>>()
const btns = ref<string[]>(['1', '2', '3', '5', '8', '13', '21', '34', '55', '?', '∞', '☕'])

async function onclick(num: number | null, namee: string): Promise<void> {
  if (num) list.value = await setPoint(namee, num)
  else list.value = await setPoint(namee, 0)
  number.value = null
  name.value = ''
}
</script>

<template>
  <div
    class="w-screen h-screen bg-[#4f80e3] flex flex-col gap-10 justify-center items-center font-sans"
  >
    <div class="flex gap-5 w-80">
      <input
        class="grow h-15 rounded-lg placeholder:text-black placeholder:text-op outline-none bg-transparent border-white border border-solid"
        type="text"
        placeholder="Type Your Name"
      /><input
        class="grow rounded-lg outline-none bg-transparent border-white border border-solid"
        type="button"
        value="Submit"
      />
    </div>
    <div class="flex gap-4 flex-wrap w-80 justify-center items-center">
      <NumberCard @click="number = btn" v-for="(btn, index) in btns" :key="index" :text="btn" />
    </div>
  </div>
</template>
