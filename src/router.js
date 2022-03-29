import { createRouter, createWebHistory } from 'vue-router'
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
      redirect: '/home/projects',
      children: [
        {
          path: 'home',
          name: 'Home',
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
              path: 'connection',
              name: 'Connection',
              component: () => import('./views/home/connection'),
              meta: {
                title: 'Connection',
                authRequired: true,
              },
            },
          ],
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
                projectActivatedRequired: true,
                projectMenuBar: true,
              },
            },
            {
              path: 'optimizations',
              name: 'Optimizations',
              component: () => import('./views/project/optimizations'),
              meta: {
                title: 'Optimizations',
                breadcrumb: 'Optimizations',
                projectActivatedRequired: true,
                projectMenuBar: true,
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
                projectActivatedRequired: true,
                // projectMenuBar: true,
              },
            },
            {
              path: 'settings',
              name: 'Settings',
              component: () => import('./views/project/settings'),
              meta: {
                breadcrumb: 'Settings',
                title: 'Settings',
                projectActivatedRequired: true,
                projectMenuBar: true,
              },
            },
            {
              path: 'plan',
              name: 'Plan',
              component: () => import('./views/project/plan'),
              meta: {
                breadcrumb: 'Plan',
                title: 'Plan',
              },
            },
            {
              path: 'checkout/:subscriptionId',
              name: 'Checkout',
              component: () => import('./views/project/checkout'),
              meta: {
                title: 'Checkout',
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
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user.authorized) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }
  const requireActivatedProject = to.matched.some(record => record.meta.projectActivatedRequired)
  const projectId = to.params.projectId
  if (requireActivatedProject && projectId && !store.getters['project'](projectId).activated) {
    next({
      path: `/projects/${projectId}/plan`,
    })
  }
  next()
})

export default router
