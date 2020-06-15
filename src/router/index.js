import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Hosts',
    component: () => import('/@/views/Hosts.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('/@/views/Groups.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '/@/views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('/@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
