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


    <div class="max-w-6xl mx-auto mt-10">

      <div class="grid grid-cols-2 gap-4 md:grid-cols-5">

    
        <div
          class="flex items-center justify-center p-6 text-3xl font-bold text-center bg-white shadow dark:bg-gray-800 rounded-xl"
        >
          YOU MAY<br />
          ALSO<br />
          LIKE
        </div>

        <div
          v-for="item in relatedProducts"
          :key="item.id"
          class="p-4 transition bg-white shadow cursor-pointer dark:bg-gray-800 rounded-xl hover:scale-105"
          @click="goToProduct(item.id)"
        >

          <img
            :src="item.thumbnail"
            class="object-contain w-full h-44"
          />

        </div>

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
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!store.products.length) {
    store.fetchProducts()
  }
})

const currentProductId = computed(() =>
  Number(route.params.id)
)

const product = computed(() =>
  store.products.find(
    p => p.id === currentProductId.value
  )
)

const relatedProducts = computed(() => {
  if (!product.value) return []

  return store.products
    .filter(
      p =>
        p.category === product.value?.category &&
        p.id !== product.value?.id
    )
    .slice(0, 4)
})

watch(
  () => route.params.id,
  () => {
    window.scrollTo(0, 0)
  }
)

const addToCart = () => {
  if (product.value) {
    store.addToCart(product.value)
  }
}

function goToProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>