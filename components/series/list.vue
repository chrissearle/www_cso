<script setup>
const { $countSplitList } = useNuxtApp();

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
});

const countSeries = (series) => {
  const tagMap = $countSplitList(
    series
      .map((element) => element.series)
      .filter((element) => element !== undefined)
  );

  return new Map([...tagMap].sort((a, b) => String(a[0]).localeCompare(b[0])));
};
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div
      class="p-6 shadow hover:bg-slate-300 grid grid-cols-[1fr_auto] justify-between items-center w-[400px] md:w-[500px]"
      v-for="[title, seriesCount] in countSeries(series)"
      :key="title"
    >
      <SeriesButton class="grid-col" :series="title" />
      <Pill class="grid-col" :count="seriesCount" />
    </div>
  </div>
</template>
