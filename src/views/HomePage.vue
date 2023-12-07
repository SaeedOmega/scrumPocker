<script setup lang="ts">
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref } from 'vue'
import SelectedCard from '@/components/SelectedCard.vue'
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

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    }
    next()
  }
})

const selectedValue = ref<string | null>(null)
const buttonsValues = [
  { key: '1/2', value: '1/2', src: numberNim },
  { key: '1', value: '1', src: numberOne },
  { key: '2', value: '2', src: numberTwo },
  { key: '3', value: '3', src: numberThree },
  { key: '5', value: '5', src: numberFive },
  { key: '8', value: '8', src: numberEight },
  { key: '13', value: '13', src: numberThirteen },
  { key: '21', value: '21', src: numberTwentyOne },
  { key: '34', value: '34', src: numberThirtyFour },
  { key: '?', value: '?', src: QuestionMark },
  { key: '∞', value: 'I Cant', src: infinity },
  { key: '☕', value: 'I Dont Want', src: coffee }
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
async function submitPoint(value: string) {
  await onSetPoint(localStorage.name, value)
  selectedValue.value = value
}
</script>

<template>
  <div class="w-screen justify-center items-center flex flex-col">
    <div class="font-Knewave self-center mb-20 m-13 text-center text-xl">ScrumPocker</div>
    <div
      :class="{ 'filter blur-sm': selectedValue }"
      class="flex max-w-380px flex-wrap gap-6 justify-center items-center"
    >
      <NumberCard
        v-for="item in buttonsValues"
        :src="item.src"
        :key="item.key"
        @click="submitPoint(item.value)"
      />
    </div>
    <SelectedCard v-model="selectedValue" v-show="selectedValue" />
  </div>
</template>
