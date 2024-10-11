<script setup lang="ts">
const props = defineProps<{
  id: string,
  title: string,
  image: string,
  width: string,
  height: string
}>()

const flickrUrl = computed(() => `https://www.flickr.com/photos/chrissearle/${props.id}/`);
</script>

<template>
  <div>
    <div class="text-center">
      <a
          data-flickr-embed="true"
          data-header="true"
          data-footer="true"
          :href="flickrUrl"
          :title="title"
      >
        <img
            :src="props.image"
            :width="width"
            :height="height"
            :alt="title">
      </a>
      <!--script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script-->
    </div>
  </div>
</template>
