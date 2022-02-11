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
          path: 'projects',
          name: 'home',
          component: () => import('./views/home'),
          meta: {
            title: 'Projects',
            authRequired: true,
            hidden: true,
          },
        },
      ],
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: MainLayout,
      meta: {
        hidden: true,
        authRequired: true,
      },
      children: [
        {
          path: '',
          name: 'Project overview',
          component: () => import('./views/project'),
          children: [
            {
              path: 'overview',
              name: 'Overview',
              component: () => import('./views/project/overview'),
              meta: {
                breadcrumb: '',
              },
            },
            {
              path: 'optimizations',
              name: 'Optimizations',
              component: () => import('./views/project/optimizations'),
              meta: {
                breadcrumb: 'Optimizations',
              },
            },
            {
              path: 'optimizations/:optimizationId',
              name: 'Optimization details',
              component: () => import('./views/project/optimizations/details'),
            },
            {
              path: 'optimizations',
              name: 'Optimizations',
              component: () => import('./views/project/optimizations'),
              meta: {
                breadcrumb: 'Optimizations',
              },
            },
            {
              path: 'settings',
              name: 'Settings',
              component: () => import('./views/project/settings'),
              meta: {
                breadcrumb: 'Settings',
              },
            },
            {
              path: 'subscription',
              name: 'Subscription',
              component: () => import('./views/project/subscription'),
              meta: {
                breadcrumb: 'Subscription',
              },
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
