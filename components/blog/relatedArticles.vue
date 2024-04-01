<template>
  <div v-if="surround.length > 0">
    <span class="font-bold mb-2 block">Previous/Next</span>
    <ul class="list-none">
      <template v-for="(other, index) in surround" :key="index">
        <li v-if="other" class="first:mt-0 mt-4 md:mt-1">
          <NuxtLink
            :to="$articleLink(other._path)"
            class="hover:underline hover:text-brand_primary"
            :aria-label="other.title"
          >
            {{ other.title }}
          </NuxtLink>
          <p
            class="!no-underline md:hidden text-sm leading-sm md:text-xs md:leading-xs mt-1"
          >
            {{ other.intro }}
          </p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  surround: {
    type: Array,
    required: true,
  },
});
</script>
