<script setup lang="ts">
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref } from 'vue'
import SelectedCard from '@/components/SelectedCard.vue'

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
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div
      :class="{ 'filter blur-sm': selectedValue }"
      class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center"
    >
      <NumberCard
        v-for="item in buttonsValues"
        :key="item.key"
        :text="item.key"
        :selected="selectedValue"
        @click="submitPoint(item.value)"
      />
    </div>
    <SelectedCard v-model="selectedValue" v-show="selectedValue" />
  </div>
</template>
