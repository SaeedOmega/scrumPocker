<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import minionImage from '../assets/loginMinionsImage.png'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

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
    <div
      style="
        font-variation-settings:
          'DSTY' 0,
          'KSHD' 100,
          'wght' 500;
      "
      class="font-light text-24px"
    >
      {{ $t('EnterYourname') }}
    </div>
    <div
      style="
        font-variation-settings:
          'DSTY' 0,
          'KSHD' 100,
          'wght' 300;
      "
      :dir="i18n.locale.value !== 'fa' ? 'ltr' : 'rtl'"
      class="font-light text-12px"
    >
      {{ $t('tozihat') }}
    </div>
    <form
      :dir="i18n.locale.value !== 'fa' ? 'ltr' : 'rtl'"
      @submit.prevent="login(name)"
      class="flex flex-col items-start justify-center"
    >
      <label
        style="
          font-variation-settings:
            'DSTY' 0,
            'KSHD' 100,
            'wght' 500;
        "
        for="name"
        class="text-12px opacity-60"
        >{{ $t('label') }}</label
      >
      <div class="h-7 flex gap-2 border-b-black border-b w-248px">
        <input
          id="name"
          type="text"
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
