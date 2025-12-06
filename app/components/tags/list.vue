<script setup lang="ts">
const { tags } = defineProps<{
  tags: string | string[]
}>()
</script>

<template>
  <div class="mt-1 flex flex-wrap gap-2">
    <TagsBadges :tags="tags"/>
  </div>
</template>