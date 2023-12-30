<script setup lang="ts">
//@ts-ignore
import { VueFlip } from 'vue-flip'
import { onSetPoint } from '../server.telefunc'
import NumberCard from '../components/NumberCard.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import ResultPage from './ResultPage.vue'
//@ts-ignore
import NProgress from 'nprogress'
import ErrorToast from '@/components/ErrorToast.vue'

defineOptions({
  beforeRouteEnter(to, from, next) {
    if (!localStorage.name) {
      next('/login')
      return
    } else if (localStorage.name === 'result') {
      next('/result')
      return
    }
    next()
  }
})

const errorRequsetMessage = ref<string | null>(null)
// این تابع یک تابع جاوا اسکریپتی هست که باید سایت گواهی امن داشته باشه تا تابع به درستی کار کنه و یک یکوست ارسال میکنه که در صفحه موبایل باعث میشه صفحه خاموش نشه
// for work correctly this feature you need https server config
let wakeLock: WakeLockSentinel | null = null
try {
  navigator.wakeLock.request('screen').then((lock) => {
    wakeLock = lock
  })
} catch (error) {
  console.log('Your Browser not Support WakeLock')
}

const selectedImg = ref<string | null>(null)
const selectedValue = ref<string | null>(null)
const isShow = ref<boolean>(false)
const buttonsValues = [
  { key: '1/2', src: 'buttons/1.png' },
  { key: '1', src: 'buttons/2.png' },
  { key: '2', src: 'buttons/3.png' },
  { key: '3', src: 'buttons/4.png' },
  { key: '5', src: 'buttons/5.png' },
  { key: '8', src: 'buttons/6.png' },
  { key: '13', src: 'buttons/7.png' },
  { key: '21', src: 'buttons/8.png' },
  { key: '34', src: 'buttons/9.png' },
  { key: '?', src: 'buttons/10.png' },
  { key: '∞', src: 'buttons/11.png' },
  { key: '☕', src: 'buttons/12.png' }
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
async function submitPoint(value: string, img: string) {
  try {
    NProgress.start()
    await onSetPoint(localStorage.name, value)
    isShow.value = true
    selectedImg.value = img
    selectedValue.value = value
    NProgress.done()
  } catch (error) {
    NProgress.done()
    if (error instanceof Error) errorRequsetMessage.value = error.message
  }
}

setInterval(async () => {
  if (localStorage.name !== 'result' && !isShow.value)
    try {
      await onSetPoint(localStorage.name, null)
    } catch (error) {
      if (error instanceof Error) errorRequsetMessage.value = error.message
    }
  else if (selectedValue.value && isShow.value)
    try {
      await onSetPoint(localStorage.name, selectedValue.value)
    } catch (error) {
      if (error instanceof Error) errorRequsetMessage.value = error.message
    }
}, 1000)
// این ایونت لیستنر برای وقتی هست که کاربر به یک تب دیگر رفت و دوباره برگشت به تب اسکرام پوکر باز هم صفحه گوشی او روشن بماند
async function stayWake() {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    wakeLock = await navigator.wakeLock.request('screen')
  }
}
document.addEventListener('visibilitychange', stayWake)
onMounted(async () => {
  if (localStorage.name !== 'result') await onSetPoint(localStorage.name, null)
})
onUnmounted(() => {
  // موقعی که از این کامپوننت یا پیج خروج کنیم صفحه گوشی از این حالت برداشته میشه و بسته به تایمی که در گوشی کاربر تنظیم شده صفحه گوشی خاموش میشه
  wakeLock?.release().then(() => {
    wakeLock = null
  })
  document.removeEventListener('visibilitychange', stayWake)
})
</script>

<template>
  <div class="flex flex-col flex-grow overflow-auto">
    <Transition name="bounce">
      <ErrorToast v-show="errorRequsetMessage && !isShow" v-model="errorRequsetMessage" />
    </Transition>
    <vue-flip
      v-model="isShow"
      width="100%"
      height="100%"
      :class="{ 'filter blur-sm': errorRequsetMessage && !isShow }"
    >
      <template v-slot:front>
        <div class="m-auto justify-center items-center flex flex-col">
          <div class="font-Knewave self-center mb-13 m-13 text-center select-none text-xl">
            ScrumPocker
          </div>
          <div
            :class="{ 'filter blur-sm': isShow }"
            class="flex flex-wrap max-w-360px gap-2.1 justify-center items-center"
          >
            <NumberCard
              v-for="item in buttonsValues"
              :background-image-src="item.src"
              :key="item.key"
              :value="item.key"
              @click="submitPoint(item.key, item.src)"
            />
          </div>
        </div>
      </template>
      <template v-slot:back>
        <Transition class="delay-100">
          <ResultPage
            v-if="isShow"
            v-model="isShow"
            :value-of-point="selectedValue"
            :selected-img="selectedImg"
            type="user"
          />
        </Transition>
      </template>
    </vue-flip>
  </div>
</template>

