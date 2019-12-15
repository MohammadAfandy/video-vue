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
      auth: true
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import('@/views/Home'),
        meta: {
        },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import('@/views/Profile'),
        meta: {
        },
      },
      {
        path: "video/list",
        name: "video",
        component: () => import('@/views/video/Video'),
        meta: {
        },
      },
      {
        path: "video/add",
        name: "video-add",
        component: () => import('@/views/video/VideoAdd'),
        meta: {
        },
      },
      {
        path: "video/edit/:id",
        name: "video-edit",
        component: () => import('@/views/video/VideoEdit'),
        meta: {
        },
      },
      {
        path: "video/:id",
        name: "video-detail",
        params: true,
        component: () => import('@/views/video/VideoDetail'),
        meta: {
        },
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/auth/Login'),
    meta: {
      auth: false
    },
  },
  {
    path: "*",
    name: "404", 
    component: () => import('@/views/error/404'),
    meta: {
      auth: false
    },
  }
]

const router = new VueRouter({
  base: '/',
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token') === null) {
      next({ name: "login" })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router