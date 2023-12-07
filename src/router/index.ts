import { createRouter, createWebHashHistory } from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      meta: {
        private: true
      },
      component: HomePageVue
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      name: 'Result',
      path: '/result',
      component: () => import('../views/ResultPage.vue')
    }
  ]
})

export default router
