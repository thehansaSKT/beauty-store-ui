import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const productsStore = defineStore('products', {

  state: () => ({
    products: [] as Product[],

    cart: JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[],

    loading: false as boolean
  }),

  actions: {

    async fetchProducts() {

      try {

        this.loading = true

        const res = await fetch('https://dummyjson.com/products')

        const data: { products: Product[] } =
          await res.json()

        this.products = data.products.filter(
          (p: Product) =>
            p.category === 'beauty' ||
            p.category === 'fragrances'
        )

      } catch (error) {

        console.error('Fetch error:', error)

      } finally {

        this.loading = false

      }

    },

    addToCart(product: Product) {

      const item = this.cart.find(
        i => i.product.id === product.id
      )

      if (item) {

        item.quantity++

      } else {

        this.cart.push({
          product,
          quantity: 1
        })

      }

      localStorage.setItem(
        'cart',
        JSON.stringify(this.cart)
      )

    },

    decreaseQuantity(productId: number) {

      const item = this.cart.find(
        i => i.product.id === productId
      )

      if (item) {

        item.quantity--

        if (item.quantity <= 0) {

          this.removeFromCart(productId)

        }

      }

      localStorage.setItem(
        'cart',
        JSON.stringify(this.cart)
      )

    },

    removeFromCart(productId: number) {

      this.cart = this.cart.filter(
        i => i.product.id !== productId
      )

      localStorage.setItem(
        'cart',
        JSON.stringify(this.cart)
      )

    }

  },

  getters: {

    cartCount: (state) =>

      state.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      )

  }

})