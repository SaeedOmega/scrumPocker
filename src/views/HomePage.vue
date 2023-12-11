<script setup lang="ts">
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref } from 'vue'
import ResultPage from './ResultPage.vue'

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    }
    next()
  }
})

const selectedImg = ref<string | null>(null)
const buttonsValues = [
  { key: '1/2', src: '../../public/buttons/1.png' },
  { key: '1', src: '../../public/buttons/2.png' },
  { key: '2', src: '../../public/buttons/3.png' },
  { key: '3', src: '../../public/buttons/4.png' },
  { key: '5', src: '../../public/buttons/5.png' },
  { key: '8', src: '../../public/buttons/6.png' },
  { key: '13', src: '../../public/buttons/7.png' },
  { key: '21', src: '../../public/buttons/8.png' },
  { key: '34', src: '../../public/buttons/9.png' },
  { key: '?', src: '../../public/buttons/10.png' },
  { key: '∞', src: '../../public/buttons/11.png' },
  { key: '☕', src: '../../public/buttons/12.png' }
]

/**
 *
 * send localStroage.name and selectedPoint by user to server for save
 *
 * @param value string data === point
 *
 * @returns void
 *
 */
async function submitPoint(value: string, img: string) {
  await onSetPoint(localStorage.name, value)
  selectedImg.value = img
}
</script>

<template>
  <div class="group flex justify-center items-center perspect-2000px">
    <div
      :class="{ 'rotate-y-180': selectedImg }"
      class="preserve-3d relative transform transition-transform duration-500"
    >
      <div
        class="max-w-360px transform rotate-x-0 <sm:inset-x-[5%] backface-hidden inset-x-[15%] justify-center absolute items-center flex flex-col"
      >
        <div class="font-Knewave self-center mb-20 m-13 text-center text-xl">ScrumPocker</div>
        <div
          :class="{ 'filter blur-sm': selectedImg }"
          class="flex flex-wrap gap-6 justify-center items-center"
        >
          <NumberCard
            v-for="item in buttonsValues"
            :src="item.src"
            :key="item.key"
            @click="submitPoint(item.key, item.src)"
          />
        </div>
      </div>
      <div class="transform rotate-y-180 rotate-x-0 flex backface-hidden">
        <ResultPage v-model="selectedImg" type="user" />
      </div>
    </div>
  </div>
</template>
