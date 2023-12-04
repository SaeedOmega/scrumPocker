<script setup lang="ts">
//@ts-ignore
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints, onGetRooms } from '../server.telefunc'
import { computed, ref } from 'vue'

type person = {
  point: string
  room: string
}
type room = {
  name: string
  creator: string
}

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    }
    next()
  }
})

let finalAverage = 0
let count = 0
let rooms = ref<Array<room>>([])
const selectedRoom = ref<string>('main')
const pointList = ref<Map<string, person>>(new Map())
const filteredPointList = computed<Array<{ name: string; point: string; room: string }>>(() => {
  let filteredArray: Array<{ name: string; point: string; room: string }> = []
  for (const person of pointList.value) {
    if (person[1].room == selectedRoom.value) filteredArray.push({ name: person[0], ...person[1] })
  }
  return filteredArray
})
const isShow = computed<boolean>(() => {
  for (const person of pointList.value) {
    if (person[1].point == '?') return false
  }
  return true
})

onGetRooms().then((r) => {
  rooms.value = r
})

async function average() {
  finalAverage = 0
  count = 0
  onGetPoint().then((r) => {
    pointList.value = r
    r.forEach((item) => {
      if (+item.point && item.room == selectedRoom.value) {
        finalAverage += item.point ? +item.point : 0
        count++
      }
    })
    let res = (finalAverage /= count).toFixed(2)
    finalAverage = +res
  })
}
async function reset() {
  onResetPoints()
  average()
}

average()
</script>

<template>
  <div class="h-screen w-screen flex flex-col gap-10 justify-center items-center">
    <div class="flex flex-col gap-5 w-full p-10">
      <span class="flex gap-5">
        <button @click="average" class="p-3 rounded-xl border-white border-1">Refresh</button>
        <button @click="reset" class="p-3 rounded-xl border-white border-1">Reset</button>
        <select v-model="selectedRoom" class="p-3 rounded-xl border-white border-1">
          <option v-for="room in rooms" :value="room.name" :key="room.name">{{ room.name }}</option>
        </select>
      </span>

      <div class="flex flex-col border-white border-1 rounded-xl">
        <ResultRow :name="'Name'" :point="'Point'" :type="'header'" />
        <ResultRow
          v-for="(item, index) in filteredPointList"
          :key="index"
          :name="item.name"
          :point="!isShow ? (item.point == '?' ? '?' : '-') : item.point"
          :type="'row'"
        />
        <ResultRow
          :name="'Result'"
          :point="!isShow || finalAverage.toString() == 'NaN' ? '-' : finalAverage.toString()"
          :type="'result'"
        />
      </div>
    </div>
  </div>
</template>
