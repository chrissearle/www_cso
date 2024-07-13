<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const {$displayDate, $articleLink} = useNuxtApp();
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div
        class="p-6 shadow hover:bg-slate-300 grid grid-cols-[1fr_auto] justify-between items-center w-[400px] md:w-[500px]"
        v-for="(article, idx) in data"
        :key="idx"
    >
      <div class="grid-col">
        <NuxtLink :to="$articleLink(article._path)" class="hover:underline">
          {{ article.title }}
        </NuxtLink>
      </div>
      <Pill class="grid-col" :pill="$displayDate(article.date)"/>
    </div>
  </div>
</template>
