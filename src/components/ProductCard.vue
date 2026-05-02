<template>
  <div
    class="overflow-hidden transition bg-white shadow-sm cursor-pointer rounded-xl hover:shadow-md"
    @click="goToDetail"
  >
   
    <div class="flex items-center justify-center w-full h-48 bg-gray-100">
      <img
        :src="product.thumbnail"
        class="object-contain h-full p-4"
      />
    </div>

    <!-- CONTENT -->
    <div class="p-4">

      <h2 class="h-10 text-sm font-semibold line-clamp-2">
        {{ product.title }}
      </h2>

      <p class="mt-2 text-lg font-bold text-black">
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