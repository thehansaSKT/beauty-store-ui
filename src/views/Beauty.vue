<template>
  <div class="min-h-screen p-6 text-black bg-gray-50 dark:bg-gray-800 dark:text-white">

    <h1 class="mb-6 text-2xl font-bold">
      Beauty Products
    </h1>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      <ProductCard
        v-for="p in beautyProducts"
        :key="p.id"
        :product="p"
      />

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { productsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const store = productsStore()

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})

const beautyProducts = computed(() =>
  store.products.filter(p => p.category === 'beauty')
)
</script>