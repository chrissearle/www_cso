<script setup>
const { $countSplitList } = useNuxtApp();

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
});

const countTags = (tags) => {
  const tagMap = $countSplitList(
    tags
      .map((element) => element.tags)
      .filter((element) => element !== undefined)
  );

  return new Map([...tagMap].sort((a, b) => String(a[0]).localeCompare(b[0])));
};
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div
      class="p-6 shadow hover:bg-slate-300 grid grid-cols-[1fr_auto] justify-between items-center w-[300px]"
      v-for="[tag, tagCount] in countTags(tags)"
      :key="tag"
    >
      <TagsButton class="grid-col" :tag="tag" />
      <Pill class="grid-col" :count="tagCount" />
    </div>
  </div>
</template>
