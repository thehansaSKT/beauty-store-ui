<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
    @click="goToDetail"
  >

    <!-- IMAGE -->
    <div class="w-full h-48 bg-gray-100 flex items-center justify-center">
      <img
        :src="product.thumbnail"
        class="h-full object-contain p-4"
      />
    </div>

    <!-- CONTENT -->
    <div class="p-4">

      <h2 class="text-sm font-semibold line-clamp-2 h-10">
        {{ product.title }}
      </h2>

      <p class="text-lg font-bold mt-2 text-black">
        ${{ product.price }}
      </p>

    </div>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>