<script setup lang="ts">
//@ts-ignore
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint } from '../server.telefunc'
import { ref } from 'vue'

let result = ref<number>(0)
let count = ref<number>(0)
let pointList = ref<Map<string, string>>()

async function average() {
  result.value = 0
  count.value = 0
  onGetPoint().then((r) => {
    pointList.value = r
    r.forEach((item) => {
      if (+item) {
        result.value += +item
        count.value++
      }
    })
    result.value /= count.value
  })
}

average()
</script>

<template>
  <div class="flex flex-col w-full p-10">
    <span
      ><button @click="average" class="p-3 rounded-xl border-white border-1">Refresh</button></span
    >
    <div class="flex flex-col border-white border-1 rounded-xl">
      <ResultRow :name="'Name'" :point="'Point'" :type="'header'" />
      <ResultRow
        v-for="(item, index) in pointList"
        :key="index"
        :name="item[0]"
        :point="item[1]"
        :type="'row'"
      />
      <ResultRow :name="'Result'" :point="result.toString()" :type="'result'" />
    </div>
  </div>
</template>
