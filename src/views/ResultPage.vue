<script setup lang="ts">
import ResultRow from '@/components/ResultRow.vue'
import { onGetPoint, onResetPoints, onSetPoint } from '../server.telefunc'
import { computed, ref, watchEffect, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import waiting from '../assets/ic_waiting.png'

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

defineProps<{ selectedImg: string | null; valueOfPoint: string | null }>()

const isResult = localStorage.name === 'result' ? true : false
const isShow = defineModel<string | boolean>()
let finalAverage = 0
let middleOfPoints = 0
let doInterval = true
let getterInterval = setInterval(() => {
  if (!doInterval) return
  onGetPoint().then((result) => {
    allPointList.value = result
  })
}, 750)
const allPointList = ref<Map<string, string>>(new Map())
/**
 * وضعیت لودینگ بودن  کامپوننت رو برمیگدونه
 */
const loading = computed<boolean>(() => {
  let isLoading = true
  if (pointList.value.size < allPointList.value.size && pointList.value.size > 0) isLoading = true
  else isLoading = false
  return isLoading
})

/**
 * کسانی که رای ندادن رو برمیگدونه
 */
const dontVotePerson = computed<Map<string, string>>(() => {
  const miniMap = new Map()
  for (const person of allPointList.value) {
    if (!person[1] && person[0] !== localStorage.name) miniMap.set(person[0], person[1])
  }
  return miniMap
})
/**
 * کسانی که رای دادن رو برمیگردونه
 */
const pointList = computed<Map<string, string>>(() => {
  const miniMap = new Map()
  for (const person of allPointList.value) {
    if (person[1]) miniMap.set(person[0], person[1])
  }
  return miniMap
})

/**
 * اگ یک نفر کاراکتر علامت سوال فرستاده باشه این کامپیوتد
 * مقدار فالس برمیگردونه تا بقیه امتیاز هارو هم نشون ندیم
 */
const shouldShow = computed<boolean>(() => {
  for (const person of pointList.value) {
    if (person[1] === '?') return false
  }
  return true
})
// /**
//  * یک عدد میگیره و نزدیک ترین عدد فیبونانچی به اون رو برمیگردونه
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
 * این تابع میانگین امتیاز ها رو محسابه میکنه
 * اگر به آن ترو ارسال بشه همچنین لیست رو بروز میکنه
 * که از این ورودی در کلیک کردن روی دکمه رفرش استفاده شده
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
 * این تابع دقیقا مانند تابع میانگین است
 * فقط عملکرد آن بدست آوردن میانه امتیاز ها است
 */
function updateMiddleOfPoints(refresh?: true) {
  if (refresh)
    onGetPoint().then((result) => {
      allPointList.value = result
    })
  let arrayOfPoints: number[] = []
  pointList.value.forEach((e) => {
    if (+e) arrayOfPoints.push(+e)
    else if (e === '1/2') arrayOfPoints.push(0.5)
  })
  arrayOfPoints.sort((a, b) => a - b)
  if (arrayOfPoints.length % 2 !== 0) {
    middleOfPoints = arrayOfPoints[Math.floor((arrayOfPoints.length - 1) / 2)]
  } else {
    middleOfPoints =
      (arrayOfPoints[Math.floor((arrayOfPoints.length - 1) / 2)] +
        arrayOfPoints[Math.floor(arrayOfPoints.length / 2)]) /
      2
  }
  // finalAverage = closestFibonacci(finalAverage)
}

function onRefreshClick(refresh?: true) {
  updateAverage(refresh)
  updateMiddleOfPoints(refresh)
}

/**
 * تمام داده های سمت سرور رو پاک میکنه
 */
async function reset() {
  onResetPoints()
  updateAverage()
  updateMiddleOfPoints()
}

// #region در این قسمت توابعی نوشتم که اگر کسی علامت سوال فرستاده میانگین و میانه و امتیاز ها نشون داده نشوند
/**
 * این تابع چک میکنه اگ پوینت های کاربرا قابل اندازه گیری بود
 * و کسی علامت سوال نفرستاده بود میانگین رو نشون میده
 * وگرنه کاراکتر خط تیره نشون میده
 */
function getAverageToShow() {
  return !shouldShow.value || isNaN(finalAverage) || pointList.value.size < allPointList.value.size
    ? '-'
    : finalAverage.toString()
}
/**
 * این تابع چک میکنه اگ پوینت های کاربرا قابل اندازه گیری بود
 * و کسی علامت سوال نفرستاده بود میانه رو نشون میده
 * وگرنه کاراکتر خط تیره نشون میده
 */
function getMiddleToShow() {
  return !shouldShow.value || isNaN(middleOfPoints) ? '-' : middleOfPoints.toString()
}
/**
 * این تابع چک میکنه اگ پوینت های کاربرا شامل علامت سوال نبود
 * پوینت هر نفر رو نشون میده
 * وگرنه کاراکتر خط تیره نشون میده
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

// وقتی بار اول کامپوننت فراخانی میشه
onGetPoint().then((result) => {
  allPointList.value = result
})

watchEffect(() => {
  if (!loading.value && allPointList.value.size !== 0) doInterval = false
  else if (loading.value) doInterval = true
  updateAverage()
  updateMiddleOfPoints()
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
    <div class="font-Knewave self-center mb-20 m-13 text-center text-xl select-none">
      ScrumPocker
    </div>
    <div
      v-if="selectedImg"
      class="text-white bg-center h-230px w-250px bg-no-repeat font-bold select-none bg-contain pt-3 text-60px text-center"
      :style="{ backgroundImage: `url(${selectedImg})` }"
    >
      {{ valueOfPoint }}
    </div>
    <div v-if="!valueOfPoint" class="flex-grow"></div>
    <div class="flex flex-col flex-grow w-full p-5">
      <span class="flex mb-5">
        <button
          v-show="!loading"
          @click.stop="onRefreshClick(true)"
          class="p-3 rounded-xl border-black border-1"
        >
          Refresh
        </button>
        <button
          v-if="isResult"
          @click="reset"
          class="p-3 rounded-xl ms-5 bg-gradient-to-b transition-all duration-[2s] hover:(from-transparent via-gray-200 to-transparent) border-black border-1"
        >
          Reset
        </button>
      </span>
      <transition name="bounce">
        <div class="flex flex-col mb-5" v-show="loading">
          <div class="self-center text-20px flex">
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
            <div class="ms-2">Waiting for</div>
          </div>
          <ul class="flex flex-col mt-3 ml-5 self-center">
            <transition-group name="bounce">
              <li
                v-for="person in dontVotePerson"
                class="font-medium last:mb-0 mb-3 flex items-center"
                :key="person[0]"
              >
                <img :src="waiting" class="h-4.5" />
                <span class="ms-3">{{ person[0] }}</span>
              </li>
            </transition-group>
          </ul>
        </div>
      </transition>

      <transition name="bounce">
        <div v-show="!loading" class="flex flex-col">
          <ResultRow :point="getAverageToShow()" :middle-point="getMiddleToShow()" type="result" />
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
