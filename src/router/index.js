import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/store/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ZoneView from '@/views/ZoneView.vue'
import DropsView from '@/views/DropsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: true
    },
    component: HomeView
  },
  {
    path: '/zoneview/:id',
    name: 'zoneview',
    meta: {
      requireAuth: true
    },
    component: ZoneView
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: LoginView
  },
  {
    path: '/drops',
    name: 'drops',
    meta: {
      requireAuth: true
    },
    component: DropsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const isAuth = auth.token

  if((to.meta.requireAuth) && (isAuth == null)) {
    next("login")
  } else {
    next()
  }
})

export default router