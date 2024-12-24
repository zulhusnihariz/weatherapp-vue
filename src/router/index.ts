import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WeatherDetailView from '@/views/WeatherDetailView.vue'

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
      component: ProfileView
    },
    {
      path: '/weather/:id',
      name: 'weather',
      component: WeatherDetailView,
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("@/views/404View.vue"),
    }
  ]
  ,
})

export default router
