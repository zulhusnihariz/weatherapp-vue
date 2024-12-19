import HomeView from '@/views/HomeView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("@/views/ProfileView.vue")
    },
    {
      path: '/weather/:id',
      name: 'weather',
      component: () => import("@/views/WeatherDetailView.vue"),
    },
  ]
  ,
})

export default router
