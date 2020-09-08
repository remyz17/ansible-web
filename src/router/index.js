import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('/@/views/inventory/Inventory.vue'),
  },
  {
    path: '/inventory/hosts',
    name: 'Hosts',
    component: () => import('/@/views/inventory/hosts/List.vue'),
  },
  {
    path: '/inventory/host/:id',
    name: 'Host',
    component: () => import('/@/views/inventory/hosts/Item.vue'),
  },
  {
    path: '/inventory/host/create',
    name: 'HostCreate',
    component: () => import('/@/views/inventory/hosts/Create.vue'),
  },
  {
    path: '/inventory/groups',
    name: 'Groups',
    component: () => import('/@/views/inventory/groups/List.vue'),
  },
  {
    path: '/inventory/group/:id',
    name: 'Group',
    component: () => import('/@/views/inventory/groups/Item.vue'),
  },
  {
    path: '/inventory/group/create',
    name: 'GroupCreate',
    component: () => import('/@/views/inventory/groups/Create.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('/@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
