import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "container",
    component: () => import('@/components/Container'),
    meta: {
      indexing: true
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import('@/views/Home'),
        meta: {
          indexing: true
        },
      },
      {
        path: "video",
        name: "video",
        component: () => import('@/views/video/Video'),
        meta: {
          indexing: true
        },
      },
      {
        path: "video/:id",
        name: "video-detail",
        params: true,
        component: () => import('@/views/video/VideoDetail'),
        meta: {
          indexing: true
        },
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/auth/Login')
  },
  {
    path: "*",
    name: "404", 
    component: () => import('@/views/error/404')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router