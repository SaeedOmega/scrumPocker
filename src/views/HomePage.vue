<script setup lang="ts">
//@ts-ignore
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { useRouter } from 'vue-router'

const route = useRouter()
if (!localStorage.name) {
  route.push('/login')
}

const buttonsValues = {
  '1/2': '0.5',
  '1': '1',
  '2': '2',
  '3': '3',
  '5': '5',
  '8': '8',
  '13': '13',
  '21': '21',
  '34': '34',
  '55': '55',
  '89': '86',
  '144': '144',
  '?': '?',
  '∞': 'I Cant',
  '☕': 'I Dont Want'
}

async function submitPoint(num: string): Promise<void> {
  //@ts-ignore
  await onSetPoint(localStorage.name, buttonsValues[num])
}
</script>

<template>
  <div class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center">
    <NumberCard
      @click="submitPoint(index)"
      v-for="(btn, index) in buttonsValues"
      :key="index"
      :text="index"
    />
  </div>
</template>
