import { createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
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
