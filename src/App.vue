<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, watchEffect } from 'vue'

const i18n = useI18n()
const lang = ref('English')

watchEffect(() => {
  if (lang.value === 'English') i18n.locale.value = 'en'
  else i18n.locale.value = 'fa'
})
</script>

<template>
  <div class="mainBackground overflow-auto flex flex-col flex-grow font-roboto">
    <div class="flex self-center items-center">
      <select v-model="lang" class="p-1">
        <option>English</option>
        <option>فارسی</option>
      </select>
      <div class="font-Knewave mb-13 m-13 text-center select-none text-xl">
        {{ $t('name') }}
      </div>
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
