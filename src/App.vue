<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, watch, onMounted } from 'vue'

const i18n = useI18n()
const lang = ref(localStorage.lang)
i18n.locale.value = lang.value || 'fa'

watch(lang, () => {
  i18n.locale.value = localStorage.lang
  if (i18n.locale.value === 'fa') document.documentElement.dir = 'rtl'
  else document.documentElement.dir = 'ltr'
})
function onClickLanguage(language: string) {
  lang.value = language
  localStorage.lang = language
}
onMounted(() => {
  if (i18n.locale.value === 'fa') document.documentElement.dir = 'rtl'
  else document.documentElement.dir = 'ltr'
})
</script>

<template>
  <div
    :class="i18n.locale.value === 'fa' ? 'font-mikhak' : 'font-roboto'"
    class="mainBackground overflow-auto flex flex-col flex-grow"
  >
    <div class="flex self-center select-none items-center relative">
      <div dir="ltr" class="absolute flex left-[-80px] items-center gap-10px">
        <div
          @click="onClickLanguage('en')"
          :class="{
            'text-white pr-2 bg-gradient-to-b  from-[#514647] via-[#6c6363] to-transparent':
              i18n.locale.value === 'en'
          }"
          class="pl-2 py-6px rounded-13px text-12px font-bold"
        >
          ENG
        </div>
        <div class="border-l-1px border-dashed border-[rgba(0,0,0,0.32)] w-0.3 h-3"></div>
        <div
          @click="onClickLanguage('fa')"
          :class="{
            'text-white bg-gradient-to-b  from-[#514647] via-[#6c6363] to-transparent':
              i18n.locale.value === 'fa'
          }"
          class="px-2 font-mikhak py-6px rounded-13px text-12px font-bold"
        >
          فا
        </div>
      </div>
      <div class="font-Knewave mb-13 m-13 text-center select-none text-xl">Scrum Pocker</div>
    </div>
    <RouterView />
  </div>
</template>

<style>
.mainBackground {
  background: radial-gradient(87.75% 87.75% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%),
    #ffcf55;
}
</style>
