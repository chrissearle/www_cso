<script setup>
const { $countSplitList } = useNuxtApp();

const { data } = await useAsyncData(`content-/tags`, async () => {
  const _posts = await queryContent("/").where({ _type: "markdown" }).find();
  return _posts.length;
});

const countTags = (tags) => {
  const tagMap = $countSplitList(
    tags
      .map((element) => element.tags)
      .filter((element) => element !== undefined)
  );

  const sortedMap = new Map([...tagMap].sort((a, b) => b[1] - a[1]));

  const mapArray = Array.from(sortedMap);

  const slicedMap = new Map();

  mapArray
    .slice(0, 5)
    .forEach((tag) => slicedMap.set(tag[0], tag[1].toString()));

  return slicedMap;
};
</script>

<template>
  <div class="aside-block">
    <h4 class="aside-heading">Popular Tags</h4>

    <ContentQuery
      path="/"
      :where="{ _type: 'markdown' }"
      :only="['tags']"
      :sort="{
        date: -1,
      }"
      v-slot="{ data }"
    >
      <div
        class="grid grid-cols-[1fr_auto] justify-between items-center mb-2"
        v-for="[tag, tagCount] in countTags(data)"
        :key="tag"
      >
        <TagsButton class="grid-col" :tag="tag" />
        <Pill class="grid-col" :count="tagCount" />
      </div>
    </ContentQuery>
  </div>
</template>
