<script setup lang="ts">
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints, onSetPoint } from '../server.telefunc'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    }
    next()
  }
})
const router = useRouter()

defineProps<{ selectedImg: string | null; value: string | null }>()

const isResult = localStorage.name == 'result' ? true : false
const isShow = defineModel<string | boolean>()
let finalAverage = 0
const allPointList = ref<Map<string, string>>(new Map())
/**
 * Returns person that send a commend.
 *
 * @returns a map of person
 *
 */
const pointList = computed<Map<string, string>>(() => {
  const miniMap = new Map()
  for (const person of allPointList.value) {
    if (person[1]) miniMap.set(person[0], person[1])
  }
  return miniMap
})

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
function updateAverage() {
  finalAverage = 0
  let count = 0
  pointList.value.forEach((item) => {
    if (+item) {
      finalAverage += +item
      count++
    } else if (item == '1/2') {
      finalAverage += 0.5
      count++
    }
  })
  let average = (finalAverage / count).toFixed(2)
  finalAverage = +average
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
  return !shouldShow.value ? (item[1] === '?' ? '?' : '-') : item[1]
}
// #endregion

async function back() {
  if (isShow.value) {
    isShow.value = false
    router.push('/')
    setTimeout(async () => await onSetPoint(localStorage.name, null), 100)
  }
}

watch(isShow, () => {
  updateAverage()
})
watchEffect(() => {
  updateAverage()
})
updateAverage()
setInterval(() => {
  onGetPoint().then((result) => {
    allPointList.value = result
  })
}, 750)
</script>

<template>
  <div
    @click="back"
    class="m-auto flex-grow max-w-480px w-full min-h-screen flex flex-col justify-center items-center"
  >
    <div class="font-Knewave self-center mb-20 m-13 text-center text-xl select-none">
      ScrumPocker
    </div>
    <div
      v-if="selectedImg"
      class="text-white bg-center h-230px w-250px bg-no-repeat font-bold select-none bg-contain pt-3 text-60px text-center"
      :style="{ backgroundImage: `url(${selectedImg})` }"
    >
      {{ value }}
    </div>
    <div v-if="!value" class="flex-grow"></div>
    <div class="flex flex-col flex-grow gap-5 w-full p-5">
      <span class="flex gap-5">
        <!-- <button @click.stop="updateAverage" class="p-3 rounded-xl border-black border-1">
          Refresh
        </button> -->
        <button v-if="isResult" @click="reset" class="p-3 rounded-xl border-black border-1">
          Reset
        </button>
      </span>

      <div class="flex flex-col">
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
