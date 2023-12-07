<script setup lang="ts">
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints } from '../server.telefunc'
import { computed, ref } from 'vue'

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
const pointList = ref<Map<string, string>>(new Map())

/**
 * Returns false if a person sent '?' else Returns true.
 *
 * @returns true or false
 *
 */
const shouldShow = computed<boolean>(() => {
  for (const person of pointList.value) {
    if (person[1] === '?') return false
  }
  return true
})

/**
 * Calculate average of data of Map from server side
 * set result with finalAverage
 * @returns void
 *
 */
async function updateAverage() {
  finalAverage = 0
  let count = 0
  onGetPoint().then((result) => {
    pointList.value = result
    result.forEach((item) => {
      if (+item) {
        finalAverage += +item
        count++
      }
    })
    let average = (finalAverage / count).toFixed(2)
    finalAverage = +average
  })
}
/**
 * reset all date in server.
 *
 * @returns void
 *
 */
async function reset() {
  onResetPoints()
  updateAverage()
}

// #region if one person send '?' all show -
/**
 * Returns a string.
 * this output show in tags to users
 * if one of user sent '?' or we havent no numbric data for avereage this is show '-'
 *
 * @returns string
 *
 */
function getAverageToShow() {
  return !shouldShow.value || isNaN(finalAverage) ? '-' : finalAverage.toString()
}
/**
 * Returns a string.
 * this output show in tags to users
 * if one of user sent '?' this is show '-'
 *
 * @returns string
 *
 */
function getPointToShow(item: { 1: string }) {
  return !shouldShow.value ? (item[1] == '?' ? '?' : '-') : item[1]
}
// #endregion

updateAverage()
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div class="flex flex-col gap-5 w-full p-10">
      <span class="flex gap-5">
        <button @click="updateAverage" class="p-3 rounded-xl border-white border-1">Refresh</button>
        <button @click="reset" class="p-3 rounded-xl border-white border-1">Reset</button>
      </span>

      <div class="flex flex-col border-white border-1 rounded-xl">
        <ResultRow name="Name" point="Point" type="header" />
        <ResultRow
          v-for="(item, index) in pointList"
          :key="index"
          :name="item[0]"
          :point="getPointToShow(item)"
          :type="'row'"
        />
        <ResultRow name="Result" :point="getAverageToShow()" type="result" />
      </div>
    </div>
  </div>
</template>
