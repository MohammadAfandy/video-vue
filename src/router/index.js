import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: "/video",
    name: "video",
    component: () => import('@/views/video/Video.vue')
  },
  {
    path: "/video/:id",
    name: "video-detail",
    params: true,
    component: () => import('@/views/video/VideoDetail.vue')
  },
  {
    path: "*",
    name: "404", 
    component: () => import('@/views/error/404.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router