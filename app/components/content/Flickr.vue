<script setup>
import {computed} from "#imports";

const props = defineProps(["id", "title", "image", "width", "height"]);

const flickrUrl = computed(() => {
  return `https://www.flickr.com/photos/chrissearle/${props.id}/`;
});
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
