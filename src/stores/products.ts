import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const productsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    cart: [] as CartItem[],
    loading: false as boolean
  }),

  actions: {

    // ✅ FETCH ONLY BEAUTY + FRAGRANCE PRODUCTS
    async fetchProducts() {
      try {
        this.loading = true

        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()

        // 🔥 FILTER HERE
        this.products = data.products.filter((p: any) =>
          p.category === 'beauty' ||
          p.category === 'fragrances'
        )

      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        this.loading = false
      }
    },

    // ➕ ADD TO CART
    addToCart(product: Product) {
      const item = this.cart.find(i => i.product.id === product.id)

      if (item) {
        item.quantity++
      } else {
        this.cart.push({
          product,
          quantity: 1
        })
      }
    },

    // ➖ DECREASE
    decreaseQuantity(productId: number) {
      const item = this.cart.find(i => i.product.id === productId)

      if (item) {
        item.quantity--

        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        }
      }
    },

    // ❌ REMOVE
    removeFromCart(productId: number) {
      this.cart = this.cart.filter(i => i.product.id !== productId)
    }

  },

  getters: {
    // ✅ TOTAL CART COUNT
    cartCount: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0)
  }
})