<script setup lang="ts">
import { ref } from 'vue'
import { setPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { useRouter } from 'vue-router'

const rout = useRouter()
if (!localStorage.name) {
  rout.push('/login')
}

const name = ref<string>(localStorage.name)
const list = ref<Map<string, number>>()

const btns = ref<string[]>(['1', '2', '3', '5', '8', '13', '21', '34', '55', '?', '∞', '☕'])

async function onclick(num: number, namee: string): Promise<void> {
  list.value = await setPoint(namee, num)
}
</script>

<template>
  <div class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center">
    <NumberCard
      @click="onclick(+btn, name)"
      v-for="(btn, index) in btns"
      :key="index"
      :text="btn"
    />
  </div>
</template>
