<script setup lang="ts">
//@ts-ignore
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints } from '../server.telefunc'
import { computed, ref } from 'vue'

let finalAverage = 0
let count = 0
let pointList = ref<Map<string, string>>(new Map())
let isShow = computed<boolean>(() => {
  for (const person of pointList.value) {
    if (person[1] == '?') return false
  }
  return true
})

async function average() {
  finalAverage = 0
  count = 0
  onGetPoint().then((r) => {
    pointList.value = r
    r.forEach((item) => {
      if (+item) {
        finalAverage += item ? +item : 0
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
  <div class="flex flex-col gap-5 w-full p-10">
    <span class="flex gap-5"
      ><button @click="average" class="p-3 rounded-xl border-white border-1">Refresh</button
      ><button @click="reset" class="p-3 rounded-xl border-white border-1">Reset</button></span
    >

    <div class="flex flex-col border-white border-1 rounded-xl">
      <ResultRow :name="'Name'" :point="'Point'" :type="'header'" />
      <ResultRow
        v-for="(item, index) in pointList"
        :key="index"
        :name="item[0]"
        :point="!isShow ? (item[1] == '?' ? '?' : '-') : item[1]"
        :type="'row'"
      />
      <ResultRow
        :name="'Result'"
        :point="!isShow || finalAverage.toString() == 'NaN' ? '-' : finalAverage.toString()"
        :type="'result'"
      />
    </div>
  </div>
</template>
