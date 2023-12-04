<script setup lang="ts">
import { onSetPoint, onGetRooms, onGetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref, computed } from 'vue'
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

let persons = ref<Map<string, { point: string; room: string; id?: number }>>(new Map())
onGetPoint().then((r) => (persons.value = r))
// const preson = computed<{ point: string; room: string; id?: number }>(()=>{})
let rooms: Array<{ name: string; creator: string }> = []
onGetRooms().then((r) => (rooms = r))

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

async function submitPoint(value: string): Promise<void> {
  await onSetPoint(localStorage.name, { point: value, room: 'main' })
  selectedValue.value = value
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-center gap-10 items-center">
    <span class="flex justify-around w-full self-start">
      <div class="flex gap-5">
        <button class="p-3 rounded-xl border-white border-1">Create Room</button>
        <button class="p-3 rounded-xl border-white border-1">Change Room</button>
      </div>
      <div class="grow"></div>
      <button class="p-3 rounded-xl border-white invisible border-1">Delete Room</button>
    </span>
    <div
      :class="{ 'filter blur-sm': selectedValue }"
      class="inline-grid justify-items-center grid-cols-3 gap-8 w-full content-center"
    >
      <NumberCard
        @click="submitPoint(btn.value)"
        v-for="btn in buttonsValues"
        :key="btn.key"
        :text="btn.key"
        :selected="selectedValue"
        :number="btn.value"
      />
    </div>
    <SelectedCard
      @text2="
        (e) => {
          selectedValue = e
        }
      "
      :text="selectedValue"
      v-show="selectedValue"
    />
  </div>
</template>
