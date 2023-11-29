<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { getPoint, setPoint } from './server.telefunc'

const number = ref<string | null>(null)
const name = ref<string>('')
const list = ref<Map<string, number>>()
const btns = ref<string[]>(['1', '2', '3', '5', '8', '13', '21', '34', '55', '?'])

async function onclk(num: number | null, namee: string): Promise<void> {
  num ? (list.value = await setPoint(namee, num)) : (list.value = await setPoint(namee, 0))
  ;(number.value = null), (name.value = '')
}
</script>

<template>
  <div class="w-screen h-screen bg-[#4f80e3] flex justify-center items-center font-sans">
    <div class="flex gap-4 flex-wrap w-80 h-60 justify-center items-center">
      <div
        v-for="(btn, index) in btns"
        :key="index"
        class="w-23 h-23 flex justify-center items-center rounded-15px border-white border-2 border-style-solid hover:bg-[#94b6fb] active:bg-[#d2e1ff] shadow-sm shadow-black font-500 text-4xl"
        @click="(e) => (number = btn)"
      >
        {{ btn }}
      </div>
      <div
        @click="(e) => (number = 'i cant')"
        class="w-23 h-23 flex justify-center items-center rounded-15px border-white border-2 border-style-solid hover:bg-[#94b6fb] active:bg-[#d2e1ff] shadow-sm shadow-black font-500 text-4xl"
      >
        &#8734;
      </div>
      <div
        @click="(e) => (number = '0.5')"
        class="w-23 h-23 flex justify-center items-center rounded-15px border-white border-2 border-style-solid hover:bg-[#94b6fb] active:bg-[#d2e1ff] shadow-sm shadow-black font-500 text-4xl"
      >
        &#xe000;
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
