<template>
  <div
    v-if="product"
    class="min-h-screen p-6 text-black bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black dark:text-white"
  >

    <div
      class="flex flex-col max-w-5xl gap-8 p-6 mx-auto bg-white shadow-lg md:flex-row dark:bg-gray-800 rounded-2xl"
    >

      <img
        :src="product.thumbnail"
        class="w-full rounded-lg shadow md:w-1/2"
      />

    
      <div class="flex flex-col justify-center">

        <h1 class="text-3xl font-bold">
          {{ product.title }}
        </h1>

        <p class="mt-4 text-gray-600 dark:text-gray-300">
          {{ product.description }}
        </p>

        <p class="mt-6 text-2xl font-bold">
          ${{ product.price }}
        </p>

        <button
          @click="addToCart"
          class="px-6 py-3 mt-6 text-white bg-black rounded hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
        >
          Add to Cart
        </button>

      </div>

    </div>

  </div>


  <p
    v-else
    class="min-h-screen p-6 text-center text-black bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black dark:text-white"
  >
    Loading product...
  </p>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()
const route = useRoute()

onMounted(() => {
  if (!store.products.length) {
    store.fetchProducts()
  }
})

const product = computed(() =>
  store.products.find(p => p.id === Number(route.params.id))
)

const addToCart = () => {
  if (product.value) {
    store.addToCart(product.value)
  }
}
</script>