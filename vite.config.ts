import { fileURLToPath, URL } from 'node:url'
// @ts-ignore
import { telefunc } from 'telefunc/vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const port = 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    telefunc({
      disableNamingConvention: true
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: { target: 'esnext' },
  appType: 'mpa',
  server: { port, host: true },
  preview: { port }
}) as UserConfig
