import './main.css'
import 'virtual:windi.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

// import translations
import fa from './locales/fa.json'
import en from './locales/en.json'

// configure i18n
const i18n = createI18n({
  locale: 'fa',
  legacy: false,
  fallbackLocale: 'fa',
  messages: { fa, en }
})

const app = createApp(App)

app.use(router).use(i18n).mount('#app')
