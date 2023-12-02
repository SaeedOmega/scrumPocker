<script setup lang="ts">
import { ref } from 'vue'
import { setPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { useRouter } from 'vue-router'

const route = useRouter()
if (!localStorage.name) {
  route.push('/login')
}

const name = ref<string>(localStorage.name)
const pointsList = ref<Map<string, string>>()

const buttonsValues = ref<string[]>([
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '34',
  '55',
  '?',
  '∞',
  '☕'
])

async function submitPoint(num: string): Promise<void> {
  if (num == '∞') pointsList.value = await setPoint(name.value, 'I Cant')
  else if (num == '☕') pointsList.value = await setPoint(name.value, '0.5')
  else pointsList.value = await setPoint(name.value, num)
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
