import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import MainLayout from '@/layouts/Main'
import store from '@/store'

const router = createRouter({
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainLayout,
      meta: {
        title: 'Projects',
        authRequired: true,
        hidden: true,
      },
      redirect: '/projects',
      children: [
        {
          path: '/projects',
          name: 'home',
          component: () => import('./views/home'),
          meta: {
            title: 'Projects',
            authRequired: true,
            hidden: true,
          },
        },
        {
          path: '/projects/:projectId',
          name: 'Project',
          component: () => import('./views/project'),
        },
        {
          path: '/projects/:projectId/optimizations',
          name: 'optimizations',
          component: () => import('./views/optimizations'),
          meta: {
            title: 'Optimizations',
            authRequired: true,
            hidden: true,
          },
        },
      ],
    },
    // System Pages
    {
      path: '/auth',
      component: MainLayout,
      redirect: 'login',
      meta: {
        title: 'Login',
        hidden: true,
      },
      children: [
        {
          path: '/404',
          name: 'route404',
          meta: {
            title: 'Error 404',
          },
          component: () => import('./views/auth/404'),
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: 'Login',
          },
          component: () => import('./views/auth/login'),
        },
      ],
    },
    // Redirect to 404
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'route404' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  setTimeout(() => {
    NProgress.done()
  }, 50)
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user.authorized) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
