<script setup lang="ts">
//@ts-ignore
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints } from '../server.telefunc'
import { computed, ref } from 'vue'

type person = {
  point: string
  room: string
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
const selectedRoom = ref<string>('main')
const pointList = ref<Map<string, person>>(new Map())

// #region Check any Person send '?'
const isShow = computed<boolean>(() => {
  for (const person of pointList.value) {
    if (person[1].point == '?') return false
  }
  return true
})
// #endregion

// #region calculated average
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
// #endregion
// #region Reset List
async function reset() {
  onResetPoints()
  average()
}
// #endregion

average()
</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="flex flex-col gap-5 w-full p-10">
      <span class="flex gap-5">
        <button @click="average" class="p-3 rounded-xl border-white border-1">Refresh</button>
        <button @click="reset" class="p-3 rounded-xl border-white border-1">Reset</button>
      </span>

      <div class="flex flex-col border-white border-1 rounded-xl">
        <ResultRow :name="'Name'" :point="'Point'" :type="'header'" />
        <ResultRow
          v-for="(item, index) in pointList"
          :key="index"
          :name="item[0]"
          :point="!isShow ? (item[1].point == '?' ? '?' : '-') : item[1].point"
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
