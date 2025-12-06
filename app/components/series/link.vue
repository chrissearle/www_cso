<script setup lang="ts">
const { series } = defineProps<{
  series: string
}>()
</script>

<template>
  <div class="mt-1 flex flex-wrap gap-2">
    <SeriesBadge :series="series"/>
  </div>
</template>