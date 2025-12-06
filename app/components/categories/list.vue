<script setup lang="ts">
const props = defineProps<{
  categories: string | string[]
}>()

</script>

<template>
  <div class="mt-1 flex flex-wrap gap-2">
    <CategoriesBadges :categories="props.categories" />
  </div>
</template>