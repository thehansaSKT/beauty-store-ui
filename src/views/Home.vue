<template>
  <div class="bg-gray-100 min-h-screen py-8">

    <div class="max-w-6xl mx-auto px-4">

      
      <div class="relative mb-10 rounded-xl overflow-hidden">

        <img
          src="C:\Users\ASUS\Desktop\html\Women\Thisa\home.jpg"
          class="w-full h-64 md:h-80 object-cover"
        />

        <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 class="text-2xl md:text-4xl font-bold">
            Beauty & Fragrance Collection
          </h1>
          <p class="mt-2 text-sm md:text-lg">
            Discover the best products for your style
          </p>
        </div>

      </div>

      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

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

const store = productsStore()

onMounted(() => {
  if (!store.products.length) {
    store.fetchProducts()
  }
})

const filteredProducts = computed(() =>
  store.products.filter(p =>
    p.category === 'beauty' || p.category === 'fragrances'
  )
)
</script>