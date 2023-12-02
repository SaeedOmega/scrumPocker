import { fileURLToPath, URL } from 'node:url'
// @ts-ignore
import { telefunc } from 'telefunc/vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windi from 'vite-plugin-windicss'

const port = 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    windi(),
    telefunc({
      disableNamingConvention: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: { target: 'esnext' },
  appType: 'spa',
  server: { port, host: true },
  preview: { port }
}) as UserConfig
