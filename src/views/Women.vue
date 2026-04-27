<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <h1 class="text-3xl font-bold mb-6">
      Women Collection (Beauty & Fragrance)
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      <ProductCard
        v-for="p in women"
        :key="p.id"
        :product="p"
        @click="goTo(p.id)"
      />

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const store = productsStore()
const router = useRouter()


onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})


const women = computed(() =>
  store.products.filter(p =>
    p.category === 'beauty' ||
    p.category === 'fragrances'
  )
)


const goTo = (id: number) => {
  router.push(`/product/${id}`)
}
</script>