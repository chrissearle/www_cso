<script setup lang="ts">
const {tagsLink} = useLinks()

const props = defineProps<{
  tags: string | string[]
}>()

</script>

<template>
  <UBadge
      v-for="tag in props.tags"
      :key="tag"
      variant="soft"
  >
    <NuxtLink :to="tagsLink(tag)">
      {{ tag }}
    </NuxtLink>
  </UBadge>
</template>