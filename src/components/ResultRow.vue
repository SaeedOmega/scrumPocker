<script setup lang="ts">
const prop = defineProps<{
  name: string
  point: string
  type: string
}>()
const minionImages: { [index: string]: string } = {
  '1/2': '../../public/minions/1.png',
  '1': '../../public/minions/2.png',
  '2': '../../public/minions/3.png',
  '3': '../../public/minions/4.png',
  '5': '../../public/minions/5.png',
  '8': '../../public/minions/6.png',
  '13': '../../public/minions/7.png',
  '21': '../../public/minions/8.png',
  '34': '../../public/minions/9.png',
  '?': '../../public/minions/10.png',
  '∞': '../../public/minions/11.png',
  '☕': '../../public/minions/12.png'
}

function setImageforPoint() {
  return minionImages[prop.point]
}
</script>

<template>
  <div
    :class="{ 'border-b-1px': type != 'result' }"
    class="flex gap-5 w-full items-center border-dashed border-black border-opacity-12"
  >
    <div
      class="flex-grow m-3 text-18px font-medium"
      :class="{ 'my-5': type != 'row', 'font-bold underline': type === 'result' }"
    >
      {{ name }}
    </div>
    <div
      class="m-3 rounded-22px items-center flex gap-2 px-1 w-80px"
      :class="{
        'my-5': type != 'row',
        'text-sm': point == 'I Dont Want',
        bgColorYellow:
          (point === '5' || point === '3' || point === '1' || point === '2') && type != 'result',
        bgColorPink: point === '1/2' && type != 'result',
        bgColorGreen: point === '8' && type != 'result',
        bgColorBlack: point === '13' && type != 'result',
        bgColorBlue: point === '21' && type != 'result',
        bgColorPurple: point === '34' && type != 'result',
        bgColorOrange: point === '?' && type != 'result',
        bgColorGray: point === '∞' && type != 'result',
        bgColorBrown: point === '☕' && type != 'result'
      }"
    >
      <p
        :class="{
          'text-white': type != 'result' && point != '-',
          'font-bold': type === 'result'
        }"
        class="flex-grow font-bold text-18px text-center"
      >
        {{ point }}
      </p>
      <img
        v-if="type != 'result' && point != '-'"
        class="w-38px h-39px shadow-'0px 10px 10px 0px #0000001A'"
        :src="setImageforPoint()"
        alt=""
      />
    </div>
  </div>
</template>

<style>
.bgColorYellow {
  background: linear-gradient(180deg, #ffb628 0%, #fed148 46.88%, rgba(255, 211, 29, 0) 100%);
}
.bgColorGreen {
  background: linear-gradient(180deg, #38884e 0%, #38884e 46.88%, rgba(56, 136, 78, 0) 100%);
}
.bgColorPink {
  background: linear-gradient(180deg, #e6a99f 0%, #eabab1 46.88%, rgba(238, 189, 180, 0) 100%);
}
.bgColorBlack {
  background: linear-gradient(180deg, #514647 0%, #6c6363 46.88%, rgba(129, 117, 117, 0) 100%);
}
.bgColorBlue {
  background: linear-gradient(180deg, #4268a9 0%, #446ba7 46.88%, rgba(134, 195, 223, 0) 100%);
}
.bgColorPurple {
  background: linear-gradient(180deg, #7d66ab 0%, #725ba4 48.44%, rgba(147, 128, 187, 0) 100%);
}
.bgColorOrange {
  background: linear-gradient(180deg, #ff7628 0%, #fe9f48 46.88%, rgba(255, 137, 29, 0) 100%);
}
.bgColorGray {
  background: linear-gradient(180deg, #bbb 0%, #bdbdbd 46.88%, rgba(193, 193, 193, 0) 100%);
}
.bgColorBrown {
  background: linear-gradient(180deg, #826149 0%, #826149 46.88%, rgba(130, 97, 73, 0) 100%);
}
</style>
