<script setup lang="ts">
const {seriesLink} = useLinks()

const props = defineProps<{
  series: string
}>()

</script>

<template>
  <div class="mt-1 flex flex-wrap gap-2">
    <SeriesBadge :series="props.series"/>
  </div>
</template>