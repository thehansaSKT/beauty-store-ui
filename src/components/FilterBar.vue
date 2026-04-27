<template>
  <div class="flex gap-4 mb-6">

    <button class="btn" @click="set('all')">All</button>
    <button class="btn" @click="set('beauty')">Beauty</button>
    <button class="btn" @click="set('fragrances')">Fragrances</button>

  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['filter'])

const set = (value: string) => {
  emit('filter', value)
}
</script>

<style scoped>
.btn {
  @apply bg-black text-white px-4 py-2 rounded;
}
</style>