<script setup>
import {computed} from "#imports";

const props = defineProps(["id", "title"]);

const youtubeUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.id}`;
});
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
