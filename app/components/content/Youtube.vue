<script setup lang="ts">
const props = defineProps<{
  id: string,
  title: string
}>()
</script>

<template>
  <h2 class="text-h4 mt-10">Video: {{ props.title }}</h2>
  <div class="d-flex flex justify-center">
    <ScriptYouTubePlayer ref="video" :video-id="props.id" />
  </div>
</template>
