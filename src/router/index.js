import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/hosts',
    name: 'Hosts',
    component: () => import('/@/views/hosts/Hosts.vue')
  },
  {
    path: '/host/:id',
    name: 'Host',
    component: () => import('/@/views/hosts/Host.vue'),
    children: [
      {
        path: '',
        name: 'HostItem',
        component: () => import('/@/views/hosts/HostItem.vue')
      },
      {
        path: '/host/:id/edit',
        name: 'HostEdit',
        component: () => import('/@/views/hosts/HostEdit.vue')
      }
    ]
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('/@/views/groups/Groups.vue')
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
