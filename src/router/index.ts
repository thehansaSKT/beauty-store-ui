import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Beauty from '@/views/Beauty.vue'
import Fragrance from '@/views/Fragrance.vue'
import Cart from '@/views/Cart.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/beauty', component: Beauty },
  { path: '/fragrance', component: Fragrance },
  { path: '/cart', component: Cart },

  // ✅ PRODUCT DETAIL ROUTE
  {
    path: '/product/:id',
    component: ProductDetail
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})