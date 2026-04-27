<template>
  <div v-if="product" class="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">

    
    <img
      :src="product.thumbnail"
      class="w-full md:w-1/2 rounded-lg shadow"
    />

   
    <div class="flex flex-col justify-center">

      <h1 class="text-3xl font-bold">
        {{ product.title }}
      </h1>

      <p class="mt-4 text-gray-600">
        {{ product.description }}
      </p>

      <p class="mt-6 text-2xl font-bold">
        ${{ product.price }}
      </p>

      <button
        @click="addToCart"
        class="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>

    </div>

  </div>

  <p v-else class="p-6 text-center">
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