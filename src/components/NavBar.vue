<template>
  <nav class="relative flex items-center justify-between px-10 py-4 text-black bg-white dark:bg-gray-900 dark:text-white">

    <!-- LOGO -->
    <h1 class="text-xl font-bold">Thisa</h1>

    <!-- MENU -->
    <div class="relative flex items-center justify-center flex-1 gap-10">

      <router-link to="/" class="hover:text-gray-400">Home</router-link>

      <!-- BEAUTY -->
      <div class="relative flex items-center gap-1">
        <router-link to="/beauty" class="hover:text-gray-400">Beauty</router-link>
        <span
          class="cursor-pointer text-[10px]"
          @mouseenter="showBeautyPreview = true"
          @mouseleave="showBeautyPreview = false"
        >
          ▼
        </span>
      </div>

      <!-- FRAGRANCE -->
      <div class="relative flex items-center gap-1">
        <router-link to="/fragrance" class="hover:text-gray-400">Fragrance</router-link>
        <span
          class="cursor-pointer text-[10px]"
          @mouseenter="showFragrancePreview = true"
          @mouseleave="showFragrancePreview = false"
        >
          ▼
        </span>
      </div>

      <!-- CART -->
      <router-link to="/cart" class="relative hover:text-gray-400">
        Cart
        <span
          v-if="cartCount > 0"
          class="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {{ cartCount }}
        </span>
      </router-link>

      <!-- SEARCH -->
      <div class="relative z-50">

        <input
          v-model="searchQuery"
          placeholder="Search products..."
          class="px-3 py-2 text-black bg-white rounded-md outline-none w-80 h-11 dark:bg-gray-800 dark:text-white"
        />

        <div
          v-if="filteredProducts.length && searchQuery"
          class="absolute left-0 w-80 mt-2 max-h-64 overflow-y-auto
                 bg-white dark:bg-gray-800
                 text-black dark:text-white
                 rounded shadow-lg top-12 z-[9999]"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            @click="goToProduct(product)"
          >
            <img :src="product.thumbnail" class="object-cover w-10 h-10 rounded" />
            <span>{{ product.title }}</span>
          </div>
        </div>

      </div>

      <!-- DARK MODE -->
      <button
        @click="toggleDark"
        class="px-3 py-1 ml-3 bg-gray-200 rounded dark:bg-gray-700"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </button>

    </div>

    <!-- BEAUTY PREVIEW -->
    <div
      v-show="showBeautyPreview"
      class="absolute top-full left-[30%] mt-2 w-[520px]
             bg-white dark:bg-gray-800 text-black dark:text-white
             rounded shadow-lg flex overflow-hidden"
    >
      <div class="w-1/2 h-64">
        <img
          src="C:\Users\ASUS\Desktop\html\Women\Thisa\cosmetic.avif"
          class="object-cover w-full h-full"
        />
      </div>

      <div class="flex flex-col justify-center w-1/2 p-4">
        <p class="font-semibold">Beauty Collection</p>
        <p>Skincare • Makeup • Hair Care</p>
      </div>
    </div>

    <!-- FRAGRANCE PREVIEW -->
    <div
      v-show="showFragrancePreview"
      class="absolute top-full left-[45%] mt-2 w-[520px]
             bg-white dark:bg-gray-800 text-black dark:text-white
             rounded shadow-lg flex overflow-hidden"
    >
      <div class="w-1/2 h-64">
        <img
          src="C:\Users\ASUS\Desktop\html\Women\Thisa\perfume.webp"
          class="object-cover w-full h-full"
        />
      </div>

      <div class="flex flex-col justify-center w-1/2 p-4">
        <p class="font-semibold">Fragrance Collection</p>
        <p>Perfumes • Body Mist</p>
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()
const router = useRouter()

onMounted(() => store.fetchProducts())

const showBeautyPreview = ref(false)
const showFragrancePreview = ref(false)
const searchQuery = ref('')
const isDark = ref(false)

const cartCount = computed(() =>
  store.cart.reduce((sum, i) => sum + i.quantity, 0)
)

const filteredProducts = computed(() => {
  if (!searchQuery.value) return []
  return store.products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function goToProduct(product:any) {
  router.push(`/product/${product.id}`)
  searchQuery.value = ''
}

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>