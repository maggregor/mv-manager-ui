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
            authRequired: true,
            hidden: true,
          },
          children: [
            {
              path: ':projectId',
              name: 'Project',
              meta: { title: 'Project' },
              component: () => import('./views/project'),
            },
          ],
        },
      ],
    },
    // System Pages
    {
      path: '/auth',
      component: MainLayout,
      redirect: 'login',
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
          path: '/500',
          meta: {
            title: 'Error 500',
          },
          component: () => import('./views/auth/500'),
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: 'Sign In',
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
