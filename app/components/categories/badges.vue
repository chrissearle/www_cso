<script setup lang="ts">
const { categoryLink } = useLinks()

const props = defineProps<{
  categories: string | string[]
}>()
</script>

<template>
  <UBadge v-for="category in props.categories" :key="category" variant="soft">
    <NuxtLink :to="categoryLink(category)">
      <UIcon name="i-heroicons-tag" class="h-4 w-4" />
      {{ category }}
    </NuxtLink>
  </UBadge>
</template>
