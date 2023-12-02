<script setup lang="ts">
import { ref } from 'vue'
//@ts-ignore
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { useRouter } from 'vue-router'

const route = useRouter()
if (!localStorage.name) {
  route.push('/login')
}

const name = ref<string>(localStorage.name)

const buttonsValues = ref<string[]>([
  '1',
  '1/2',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '34',
  '55',
  '89',
  '144',
  '?',
  '∞',
  '☕'
])

async function submitPoint(num: string): Promise<void> {
  if (num == '∞') await onSetPoint(name.value, 'I Cant')
  else if (num == '☕') await onSetPoint(name.value, '0.5')
  else await onSetPoint(name.value, num)
}
</script>

<template>
  <div class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center">
    <NumberCard
      @click="submitPoint(btn)"
      v-for="(btn, index) in buttonsValues"
      :key="index"
      :text="btn"
    />
  </div>
</template>
