<template>
  <figure class="my-5">
    <a
        :href="refinedSrc"
        target="_blank"
        rel="noopener"
        :title="alt"
        :aria-labelledby="captionId"
    >
      <NuxtImg
          :src="refinedSrc"
          :alt="alt"
          class="w-full max-h-[600px] object-contain"
      />
      <span class="sr-only">{{ alt }}</span>
    </a>

    <figcaption
        :id="captionId"
        class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      {{ alt }}
    </figcaption>
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
