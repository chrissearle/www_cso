<script setup lang="ts">
const props = defineProps<{
  id: string,
  title: string
}>()

const youtubeUrl = computed(() => `https://www.youtube.com/embed/${props.id}`);
</script>

<template>
  <div>
    <iframe
        width="560"
        height="315"
        :src="youtubeUrl"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
  </div>
</template>
