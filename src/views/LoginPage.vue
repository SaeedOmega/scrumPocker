<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import minionImage from '../assets/loginMinionsImage.png'

// defineOptions({
//   beforeRouteEnter(to, from, next) {
//     if (localStorage.name) {
//       next('/')
//       return
//     }
//     next()
//   }
// })

const router = useRouter()
const name = ref<string>('')

/**
 *
 * set localStorage with user input
 *
 * @param name string data
 *
 * @returns void
 *
 */
function login(name: string): void {
  localStorage.name = name
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col flex-grow gap-10 justify-center items-center">
    <div class="font-medium text-24px">
      {{ $t('enterYourname') }}
    </div>
    <div :dir="$i18n.locale !== 'fa' ? 'ltr' : 'rtl'" class="font-light text-12px">
      {{ $t('tozihat') }}
    </div>
    <form
      :dir="$i18n.locale !== 'fa' ? 'ltr' : 'rtl'"
      @submit.prevent="login(name)"
      class="flex flex-col items-start justify-center"
    >
      <label for="name" class="text-12px opacity-60 font-medium">{{ $t('label') }}</label>
      <div
        :class="[
          $i18n.locale === 'fa' || !name.match(/^[\u0600-\u06FF\s]+$/) ? ' w-261px' : 'w-278px',
          $i18n.locale === 'fa' ? 'gap-4' : 'gap-2'
        ]"
        class="h-7 flex border-b-black border-b"
      >
        <input
          id="name"
          type="text"
          :class="{ 'font-mikhak': name.match(/^[\u0600-\u06FF\s]+$/) }"
          class="bg-transparent h-full placeholder:text-[rgba(9,9,9,0.4)] outline-none px-2"
          :placeholder="$t('namePlaceHolder')"
          v-model="name"
          autofocus
        />
        <button
          type="button"
          v-show="name"
          class="bg-transparent h-full rounded-md active:bg-[#94b6fb]"
          @click="login(name)"
        >
          {{ $t('submit') }}
        </button>
      </div>
    </form>
    <img :src="minionImage" alt="minions" width="200" height="323" />
  </div>
</template>
