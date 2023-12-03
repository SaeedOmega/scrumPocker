<script setup lang="ts">
//@ts-ignore
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { useRouter } from 'vue-router'

const route = useRouter()
if (!localStorage.name) {
  route.push('/login')
}

const buttonsValues = [
  { key: '1/2', value: '1/2' },
  { key: '1', value: '1' },
  { key: '2', value: '2' },
  { key: '3', value: '3' },
  { key: '5', value: '5' },
  { key: '8', value: '8' },
  { key: '13', value: '13' },
  { key: '21', value: '21' },
  { key: '34', value: '34' },
  { key: '55', value: '55' },
  { key: '89', value: '89' },
  { key: '144', value: '144' },
  { key: '?', value: '?' },
  { key: '∞', value: 'I Cant' },
  { key: '☕', value: 'I Dont Want' }
]

async function submitPoint(num: string): Promise<void> {
  //@ts-ignore
  await onSetPoint(localStorage.name, num)
}
</script>

<template>
  <div class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center">
    <NumberCard
      @click="submitPoint(btn.value)"
      v-for="btn in buttonsValues"
      :key="btn.key"
      :text="btn.key"
    />
  </div>
</template>
