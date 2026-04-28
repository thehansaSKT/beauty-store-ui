<template>
  <div class="min-h-screen p-6 text-black bg-gray-50 dark:bg-gray-800 dark:text-white">

    <h1 class="mb-6 text-2xl font-bold">
      Shopping Cart
    </h1>

    <!-- CART ITEMS -->
    <div v-if="store.cart.length">

      <div
        v-for="item in store.cart"
        :key="item.product.id"
        class="flex items-center justify-between p-4 mb-3 bg-white rounded shadow dark:bg-gray-700"
      >

        <!-- PRODUCT INFO -->
        <div>

          <h2 class="font-semibold">
            {{ item.product.title }}
          </h2>

          <p class="text-gray-500 dark:text-gray-300">
            ${{ item.product.price }}
          </p>

          <!-- QUANTITY CONTROL -->
          <div class="flex items-center gap-2 mt-2">

            <button
              class="px-2 bg-gray-300 rounded dark:bg-gray-600"
              @click="store.decreaseQuantity(item.product.id)"
            >
              -
            </button>

            <span class="font-semibold">
              {{ item.quantity }}
            </span>

            <button
              class="px-2 bg-gray-300 rounded dark:bg-gray-600"
              @click="store.addToCart(item.product)"
            >
              +
            </button>

          </div>

        </div>

        <!-- REMOVE BUTTON -->
        <button
          class="px-3 py-1 text-white bg-red-500 rounded"
          @click="store.removeFromCart(item.product.id)"
        >
          Remove
        </button>

      </div>

      <!-- TOTAL PRICE -->
      <div class="p-4 mt-6 bg-gray-100 rounded shadow dark:bg-gray-900">

        <h2 class="text-xl font-bold">
          Total Price: {{ totalPrice }}
        </h2>

      </div>

    </div>

    <!-- EMPTY CART -->
    <p v-else class="text-gray-500 dark:text-gray-300">
      Cart is empty
    </p>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { productsStore } from '@/stores/products'

const store = productsStore()

const totalPrice = computed(() => {
  const total = store.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total)
})
</script>