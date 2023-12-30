import './main.css'
import 'virtual:windi.css'
import '../node_modules/nprogress/nprogress.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
