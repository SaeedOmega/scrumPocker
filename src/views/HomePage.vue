<script setup lang="ts">
//@ts-ignore
import { VueFlip } from 'vue-flip'
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref } from 'vue'
import ResultPage from './ResultPage.vue'

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    } else if (localStorage.name === 'result') {
      next('/result')
      return
    }
    next()
  }
})

const selectedImg = ref<string | null>(null)
const selectedValue = ref<string | null>(null)
const isShow = ref<boolean>(false)
const buttonsValues = [
  { key: '1/2', src: 'buttons/1.png' },
  { key: '1', src: 'buttons/2.png' },
  { key: '2', src: 'buttons/3.png' },
  { key: '3', src: 'buttons/4.png' },
  { key: '5', src: 'buttons/5.png' },
  { key: '8', src: 'buttons/6.png' },
  { key: '13', src: 'buttons/7.png' },
  { key: '21', src: 'buttons/8.png' },
  { key: '34', src: 'buttons/9.png' },
  { key: '?', src: 'buttons/10.png' },
  { key: '∞', src: 'buttons/11.png' },
  { key: '☕', src: 'buttons/12.png' }
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
  isShow.value = true
  selectedImg.value = img
  selectedValue.value = value
}
</script>

<template>
  <vue-flip v-model="isShow" width="100%" height="100%">
    <template v-slot:front>
      <div class="m-auto justify-center items-center flex flex-col">
        <div class="font-Knewave self-center mb-20 m-13 text-center select-none text-xl">
          ScrumPocker
        </div>
        <div
          :class="{ 'filter blur-sm': isShow }"
          class="flex flex-wrap max-w-360px gap-2.1 justify-center items-center"
        >
          <NumberCard
            v-for="item in buttonsValues"
            :background-image-src="item.src"
            :key="item.key"
            :value-of-point="item.key"
            @click="submitPoint(item.key, item.src)"
          />
        </div>
      </div>
    </template>
    <template v-slot:back>
      <div>
        <ResultPage
          v-model="isShow"
          :value-of-point="selectedValue"
          :selected-img="selectedImg"
          type="user"
        />
      </div>
    </template>
  </vue-flip>
</template>
