<template>
  <figure class="my-5">
    <a :href="refinedSrc" target="_blank" :title="alt" :aria-labelledby="captionId">
      <v-img :src="refinedSrc" :alt="alt" class="w-100" max-height="600"/>
      <span class="d-sr-only">{{ alt }}</span>
    </a>
    <figcaption :id="captionId" class="text-center text-grey-lighten-3">{{ alt }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import {withBase} from 'ufo';
import {computed, useRuntimeConfig} from '#imports';

const captionId = useId()

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL);
  }
  return props.src;
});
</script>
