<script setup>
const props = defineProps({
  series: {
    type: String,
    required: true,
  },
});

const seriesLink = () => {
  return "/series/" + props.series;
};
</script>

<template>
  <NuxtLink :to="seriesLink()" class="text-red-400 pr-2 hover:underline">
    {{ series }}
  </NuxtLink>
</template>
