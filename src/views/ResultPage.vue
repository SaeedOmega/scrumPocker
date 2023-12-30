<script setup lang="ts">
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints, onSetPoint } from '../server.telefunc'
import { computed, ref, watchEffect, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import waiting from '../assets/ic_waiting.png'
import { useI18n } from 'vue-i18n'
import defaultImg from '../assets/resultImg.png'

const i18n = useI18n()

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    } else if (localStorage.name !== 'result') {
      next('/')
      return
    }
    next()
  }
})
const router = useRouter()

const prop = defineProps<{ selectedImg?: string | null; valueOfPoint?: string | null }>()

const isResult = localStorage.name === 'result' ? true : false
const isShow = defineModel<string | boolean>()
let finalAverage = 0
let doInterval = true
let getterInterval = setInterval(() => {
  if (!doInterval) return
  onGetPoint().then((result) => {
    allPointList.value = result
  })
}, 750)
const allPointList = ref<Map<string, string>>(new Map())
/**
 * Returns state of waiting for allVote or Not.
 *
 * @returns Boolean
 *
 */
const loading = computed<boolean>(() => {
  let isLoading = true
  if (pointList.value.size < allPointList.value.size && pointList.value.size > 0) isLoading = true
  else isLoading = false
  return isLoading
})

/**
 * Returns person that doesnt send a vote.
 *
 * @returns a map of person
 *
 */
const dontVotePerson = computed<Map<string, string>>(() => {
  const miniMap = new Map()
  for (const person of allPointList.value) {
    if (!person[1] && person[0] !== localStorage.name) miniMap.set(person[0], person[1])
  }
  return miniMap
})
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
// /**
//  * a number
//  * @param num
//  *
//  * return nearstFibonacciNumber to input
//  * @returns number
//  */
// function closestFibonacci(num: number) {
//   if (num <= 0.5) {
//     return 0.5
//   }

//   let prevFib = 1
//   let currFib = 2
//   // حلقه تا زمانی ادامه می‌یابد که عدد جاری کوچک‌تر یا مساوی عدد ورودی باشد
//   while (currFib <= num) {
//     let newFib = prevFib + currFib
//     prevFib = currFib
//     currFib = newFib
//   }
//   // بررسی می‌کند که عدد ورودی به کدام عدد فیبوناتچی نزدیک‌تر است
//   if (num - prevFib > currFib - num) {
//     return currFib
//   } else {
//     return prevFib
//   }
// }

/**
 * Calculate average of data of Map from server side
 * set result with finalAverage
 * @returns void
 *
 */
function updateAverage(refresh?: true) {
  if (refresh)
    onGetPoint().then((result) => {
      allPointList.value = result
    })
  finalAverage = 0
  let count = 0
  pointList.value.forEach((item) => {
    if (+item) {
      finalAverage += +item
      count++
    } else if (item === '1/2') {
      finalAverage += 0.5
      count++
    }
  })
  let average = (finalAverage / count).toFixed(2)
  finalAverage = +average
  // finalAverage = closestFibonacci(finalAverage)
}
/**
 * reset all date in server.
 *
 * @returns void
 *
 */
async function reset() {
  onResetPoints()
  updateAverage(true)
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
  return !shouldShow.value || isNaN(finalAverage) || pointList.value.size < allPointList.value.size
    ? '-'
    : finalAverage.toString()
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
  return !shouldShow.value || pointList.value.size < allPointList.value.size
    ? item[1] === '?'
      ? '?'
      : '-'
    : item[1]
}
// #endregion

async function back() {
  if (isShow.value) {
    isShow.value = false
    router.push('/')
    setTimeout(async () => await onSetPoint(localStorage.name, null), 100)
  }
}

// for first
onGetPoint().then((result) => {
  allPointList.value = result
})

watchEffect(() => {
  if (!loading.value && allPointList.value.size !== 0 && prop.selectedImg) doInterval = false
  else if (loading.value) doInterval = true
  updateAverage()
})
onUnmounted(() => {
  clearInterval(getterInterval)
})
</script>

<template>
  <div
    @click="back"
    class="m-auto flex-grow max-w-480px w-full flex flex-col justify-center items-center"
  >
    <div
      v-if="selectedImg"
      class="text-white bg-center h-230px font-bold w-250px bg-no-repeat select-none bg-contain pt-3 text-67px text-center"
      :style="{
        backgroundImage: `url(${selectedImg})`
      }"
      :class="{ 'font-roboto': valueOfPoint === '∞' }"
    >
      {{
        //@ts-ignore
        $t(valueOfPoint)
      }}
    </div>
    <div
      v-if="!selectedImg"
      class="bg-center mr-10 mb-5 h-300px w-300px bg-no-repeat select-none bg-contain pt-3"
      :style="{
        backgroundImage: `url(${defaultImg})`
      }"
    />
    <div class="flex flex-col flex-grow gap-5 w-full p-5">
      <span class="flex gap-5">
        <button
          v-show="!loading"
          @click.stop="updateAverage(true)"
          class="p-3 rounded-xl border-black border-1 font-medium"
        >
          {{ $t('refreshBottom') }}
        </button>
        <button
          v-if="isResult"
          @click="reset"
          class="p-3 rounded-xl bg-gradient-to-b font-medium transition-all duration-[2s] hover:(from-transparent via-gray-200 to-transparent) border-black border-1"
        >
          {{ $t('resetBottom') }}
        </button>
      </span>
      <transition name="bounce">
        <div
          :dir="i18n.locale.value !== 'fa' ? 'ltr' : 'rtl'"
          class="flex flex-col"
          v-show="loading"
        >
          <div class="self-center text-20px flex gap-2">
            <div id="wrapper">
              <div class="profile-main-loader">
                <div class="loader">
                  <svg class="circular-loader" viewBox="25 25 50 50">
                    <circle
                      class="loader-path"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="#70c542"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="font-bold">
              {{ $t('Waitingfor') }}
            </div>
          </div>
          <ul class="flex flex-col gap-3 mt-3 self-center">
            <transition-group name="bounce">
              <li
                v-for="person in dontVotePerson"
                class="font-medium flex items-center gap-3"
                :key="person[0]"
              >
                <img :src="waiting" class="h-4.5" />
                <span
                  :class="{ 'font-mikhak font-medium': person[0].match(/^[\u0600-\u06FF\s]+$/) }"
                  >{{ person[0] }}</span
                >
              </li>
            </transition-group>
          </ul>
        </div>
      </transition>

      <transition name="bounce">
        <div
          :dir="i18n.locale.value !== 'fa' ? 'ltr' : 'rtl'"
          v-show="!loading"
          class="flex flex-col"
        >
          <ResultRow name="Result" :point="getAverageToShow()" type="result" />
          <transition-group name="bounce">
            <ResultRow
              v-for="(item, index) in pointList"
              :key="index"
              :name="item[0]"
              :point="getPointToShow(item)"
              :type="'row'"
            />
          </transition-group>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
