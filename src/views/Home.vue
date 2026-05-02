<template>
  <div class="min-h-screen py-8 text-black bg-gray-50 dark:bg-gray-800 dark:text-white">

    <div class="max-w-6xl px-4 mx-auto">

      <div class="relative mb-10 overflow-hidden shadow rounded-xl">

        <img
          :src="homeImage"
          class="object-cover w-full h-64 md:h-80"
          alt="Beauty banner"
        />

        <div class="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40">
          <h1 class="text-2xl font-bold md:text-4xl">
            Beauty & Fragrance Collection
          </h1>
          <p class="mt-2 text-sm md:text-lg">
            Discover the best products for your style
          </p>
        </div>

      </div>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

        <ProductCard
          v-for="p in filteredProducts"
          :key="p.id"
          :product="p"
        />

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { productsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

import homeImage from "../../Images/home.jpg"

const store = productsStore()

onMounted(async () => {
  await store.fetchProducts()
})

const filteredProducts = computed(() =>
  store.products.filter(p =>
    p.category === 'beauty' || p.category === 'fragrances'
  )
)
</script>