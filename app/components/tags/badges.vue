<script setup lang="ts">
const props = defineProps<{
  tags: string | string[]
}>()

const { badgesForTags } = useBadges()
const badges = computed(() => badgesForTags(props.tags))
</script>

<template>
  <BadgeItems :badges="badges" />
</template>
