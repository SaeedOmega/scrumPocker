<script setup lang="ts">
const prop = defineProps<{
  // نام کسی که امتیاز داده
  name: string
  // مقدار امتیاز آن شخص
  point: string
  // اگر این کامپوننت شامل تایو باشه فقط میتونه مقدار ریزالت باشه که دیزاین سطر ریزالت فرق میکنه
  type?: 'result' | 'row'
}>()

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
    class="flex gap-5 w-full last:border-none border-b-1px items-center border-dashed border-black border-opacity-12"
  >
    <div
      class="flex-grow m-3 text-18px select-none font-medium"
      :class="{ 'my-5': type !== 'row', 'font-bold underline': type === 'result' }"
    >
      {{ name }}
    </div>
    <div
      class="m-3 rounded-22px bg-gradient-to-b items-center flex-shrink-0 flex gap-2 px-1 w-80px"
      :class="[
        {
          'my-5': type !== 'row',
          'text-sm': point == 'I Dont Want'
        },
        type !== 'result' && getBgColor()
      ]"
    >
      <span
        :class="{
          'text-white': type !== 'result' && point !== '-',
          'font-bold': type === 'result'
        }"
        class="flex-grow select-none font-bold text-18px text-center"
      >
        {{ point }}
      </span>
      <img
        v-if="type !== 'result' && point !== '-'"
        class="w-38px h-39px shadow-'0px 10px 10px 0px #0000001A'"
        :src="getImageforPoint()"
        alt=""
      />
    </div>
  </div>
</template>
