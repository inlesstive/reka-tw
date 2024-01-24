import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/cart.vue')
    }
  ]
})

export default router
