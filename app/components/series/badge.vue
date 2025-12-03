<script setup lang="ts">
const {seriesLink} = useLinks()

const props = defineProps<{
  series: string
}>()
</script>

<template>
    <UBadge
        variant="soft"
    >
      <NuxtLink :to="seriesLink(series)">
        <UIcon name="i-heroicons-user-group" class="h-4 w-4" />
        {{ series }}
      </NuxtLink>
    </UBadge>
</template>