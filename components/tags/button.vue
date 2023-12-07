<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
});

const tagsLink = () => {
  return "/tags/" + props.tag;
};
</script>

<template>
  <NuxtLink :to="tagsLink()" class="text-blue-400 pr-2 hover:underline">
    {{ tag }}
  </NuxtLink>
</template>
