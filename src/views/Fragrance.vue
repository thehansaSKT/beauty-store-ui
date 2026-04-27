<template>
  <div class="p-6">

    <h1 class="text-2xl font-bold mb-6">
      Fragrance Products
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <ProductCard
        v-for="p in fragranceProducts"
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

const fragranceProducts = computed(() =>
  store.products.filter(p => p.category === 'fragrances')
)
</script>