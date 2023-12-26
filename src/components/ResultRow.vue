<script setup lang="ts">
import { computed } from 'vue'

const prop = defineProps<{
  // نام کسی که امتیاز داده
  name?: string
  // مقدار امتیاز آن شخص
  point: string
  middlePoint?: string
  // اگر این کامپوننت شامل تایو باشه فقط میتونه مقدار ریزالت باشه که دیزاین سطر ریزالت فرق میکنه
  type?: 'result' | 'row'
}>()

const isTypeResult = computed<boolean>(() => {
  return prop.type === 'result' ? true : false
})
const isShowPoint = computed<boolean>(() => {
  return !isTypeResult.value && prop.point !== '-' ? true : false
})

const minionImages: Record<string, string> = {
  '1/2': 'minions/1.png',
  '1': 'minions/2.png',
  '2': 'minions/3.png',
  '3': 'minions/4.png',
  '5': 'minions/5.png',
  '8': 'minions/6.png',
  '13': 'minions/7.png',
  '21': 'minions/8.png',
  '34': 'minions/9.png',
  '?': 'minions/10.png',
  '∞': 'minions/11.png',
  '☕': 'minions/12.png'
}
const minionBg: Record<string, string> = {
  '1/2': 'from-[#e6a99f] via-[#eabab1] to-transparent',
  '1': 'from-[#ffb628] via-[#fed148] to-transparent',
  '2': 'from-[#ffb628] via-[#fed148] to-transparent',
  '3': 'from-[#ffb628] via-[#fed148] to-transparent',
  '5': 'from-[#ffb628] via-[#fed148] to-transparent',
  '8': 'from-[#38884e] via-[#38884e] to-transparent',
  '13': 'from-[#514647] via-[#6c6363] to-transparent',
  '21': 'from-[#4268a9] via-[#446ba7] to-transparent',
  '34': 'from-[#7d66ab] via-[#725ba4] to-transparent',
  '?': 'from-[#ff7628] via-[#fe9f48] to-transparent',
  '∞': 'from-[#bbb] via-[#bdbdbd] to-transparent',
  '☕': 'from-[#826149] via-[#826149] to-transparent'
}

function getImageforPoint() {
  return minionImages[prop.point]
}

function getBgColor() {
  return minionBg[prop.point]
}

// در صورت عادی وقتی رو هرجای کامپوننت ریزالت پیج کلیک بشه به برمیگرده به صفحه امتیاز دهی
// این رو برای این گذاشتم که وقتی روی سطر نتایج کلیک شد به صفحه امتیاز دهی برنگرده
function handleBack(event: Event) {
  if (prop.type == 'result') event.stopPropagation()
}
</script>

<template>
  <div
    @click="handleBack"
    class="flex w-full last:border-none border-b-1px items-center border-dashed border-black border-opacity-12"
  >
    <div class="flex flex-grow">
      <div
        class="flex-grow m-3 text-18px select-none font-medium"
        :class="{ 'my-5': type !== 'row', 'font-bold underline': isTypeResult }"
      >
        {{ isTypeResult ? 'Average' : name }}
      </div>
      <div
        class="m-3 rounded-22px bg-gradient-to-b items-center flex-shrink-0 flex px-1"
        :class="[
          {
            'my-5': type !== 'row',
            'text-sm': point == 'I Dont Want',
            'w-80px': !isTypeResult
          },
          !isTypeResult && getBgColor()
        ]"
      >
        <span
          :class="{
            'text-white': isShowPoint,
            'font-bold': isTypeResult
          }"
          class="flex-grow select-none font-bold text-18px text-center"
        >
          {{ point }}
        </span>
        <img
          v-if="isShowPoint"
          class="w-38px h-39px ms-2 shadow-[0px_10px_10px_0px_#0000001A]"
          :src="getImageforPoint()"
          alt=""
        />
      </div>
    </div>
    <div class="flex items-center flex-grow" v-if="isTypeResult">
      <div class="border-l-1px mr-5 border-dashed border-black h-10 grow"></div>
      <div
        class="flex-grow m-3 text-18px select-none font-medium"
        :class="{ 'font-bold underline': isTypeResult }"
      >
        Middle
      </div>
      <span
        :class="{
          'text-white': isShowPoint,
          'font-bold': isTypeResult
        }"
        class="flex-grow select-none font-bold text-18px text-center"
      >
        {{ middlePoint }}
      </span>
    </div>
  </div>
</template>
