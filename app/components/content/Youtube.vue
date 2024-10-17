<script setup lang="ts">
const props = defineProps<{
  id: string,
  title: string
}>()
</script>

<template>
  <div class="d-flex flex justify-center">
    <ScriptYouTubePlayer ref="video" :video-id="props.id" />
  </div>
</template>
