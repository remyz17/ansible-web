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
    component: () => import('/@/views/Inventory.vue'),
    children: [
      {
        path: 'hosts',
        name: 'Hosts',
        component: () => import('/@/views/hosts/List.vue'),
      },
      {
        path: 'host/:id',
        name: 'Host',
        component: () => import('/@/views/hosts/Item.vue'),
        /* children: [
          {
            path: 'edit',
            name: 'HostEditm',
            component: () => import('/@/views/hosts/HostEdit.vue')
          }
        ] */
      },
      {
        path: 'host/create',
        name: 'HostCreate',
        component: () => import('/@/views/hosts/Create.vue'),
      },
      {
        path: 'groups',
        name: 'Groups',
        component: () => import('/@/views/groups/List.vue'),
      },
      {
        path: 'group/:id',
        name: 'Group',
        component: () => import('/@/views/groups/Item.vue'),
        /* children: [
          {
            path: 'edit',
            name: 'GroupEditm',
            component: () => import('/@/views/groups/GroupEdit.vue')
          }
        ] */
      },
      {
        path: 'group/create',
        name: 'GroupCreate',
        component: () => import('/@/views/groups/Create.vue'),
      },
    ],
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
