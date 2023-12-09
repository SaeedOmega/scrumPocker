<script setup lang="ts">
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref } from 'vue'
import numberNim from '../assets/buttons/1.png'
import numberOne from '../assets/buttons/2.png'
import numberTwo from '../assets/buttons/3.png'
import numberThree from '../assets/buttons/4.png'
import numberFive from '../assets/buttons/5.png'
import numberEight from '../assets/buttons/6.png'
import numberThirteen from '../assets/buttons/7.png'
import numberTwentyOne from '../assets/buttons/8.png'
import numberThirtyFour from '../assets/buttons/9.png'
import QuestionMark from '../assets/buttons/10.png'
import infinity from '../assets/buttons/11.png'
import coffee from '../assets/buttons/12.png'
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
  { key: '1/2', src: numberNim },
  { key: '1', src: numberOne },
  { key: '2', src: numberTwo },
  { key: '3', src: numberThree },
  { key: '5', src: numberFive },
  { key: '8', src: numberEight },
  { key: '13', src: numberThirteen },
  { key: '21', src: numberTwentyOne },
  { key: '34', src: numberThirtyFour },
  { key: '?', src: QuestionMark },
  { key: '∞', src: infinity },
  { key: '☕', src: coffee }
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
      class="preserve-3d backface-hidden relative transform transition-transform duration-500"
    >
      <div
        class="max-w-360px <sm:inset-x-[5%] inset-x-[15%] justify-center absolute backface-hidden items-center flex flex-col"
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
      <div class="transform rotate-y-180 flex backface-hidden">
        <ResultPage v-model="selectedImg" type="user" />
      </div>
    </div>
  </div>
</template>

<style></style>
