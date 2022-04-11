import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main'
import store from '@/store'
import { trackPage } from './analyticsHelper'

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
      redirect: '/home/projects',
      children: [
        {
          path: 'home',
          name: 'Home',
          redirect: '/home/projects',
          component: () => import('./views/home'),
          redirect: '/projects',
          children: [
            {
              path: 'projects',
              name: 'Projects',
              component: () => import('./views/home/project-list'),
              meta: {
                title: 'Project List',
                authRequired: true,
              },
            },
            {
              path: 'connections',
              name: 'Connections',
              component: () => import('./views/home/connections'),
              meta: {
                title: 'Connection',
                authRequired: true,
              },
            },
            {
              path: 'billing',
              name: 'Billing',
              component: () => import('./views/home/billing'),
              meta: {
                title: 'Billing',
                authRequired: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: MainLayout,
      meta: {
        title: 'Overview',
        hidden: true,
        authRequired: true,
      },
      children: [
        {
          path: '',
          name: 'Project layout',
          component: () => import('./views/project'),
          redirect: '/overview',
          children: [
            {
              path: 'overview',
              name: 'Overview',
              component: () => import('./views/project/overview'),
              meta: {
                title: 'Overview',
                breadcrumb: '',
              },
            },
            {
              path: 'materialized-views',
              name: 'Materialized Views',
              component: () => import('./views/project/materialized-views'),
              meta: {
                breadcrumb: 'Materialized Views',
                title: 'Materialized Views',
              },
            },
            {
              path: 'optimizations',
              name: 'Optimizations',
              component: () => import('./views/project/optimizations'),
              meta: {
                title: 'Optimizations',
                breadcrumb: 'Optimizations',
              },
              children: [
                {
                  path: ':optimizationId',
                  name: 'Optimization details',
                  component: () => import('./views/project/optimizations/details'),
                  meta: {
                    title: 'Details',
                  },
                },
              ],
            },
            {
              path: 'datasets',
              name: 'Datasets',
              component: () => import('./views/project/datasets'),
              meta: {
                breadcrumb: 'Datasets',
                title: 'Datasets',
              },
            },
            {
              path: 'settings',
              name: 'Settings',
              component: () => import('./views/project/settings'),
              meta: {
                breadcrumb: 'Settings',
                title: 'Settings',
              },
            },
          ],
        },
      ],
    },
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
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user.authorized) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }
  trackPage(to.fullPath)
  next()
})

export default router
