<script setup>
const { $articleLink, $displayDate } = useNuxtApp();

const { data } = await useAsyncData(`content-/articles`, async () => {
  const _posts = await queryContent("/").where({ _type: "markdown" }).find();
  return _posts.length;
});
</script>

<template>
  <div class="aside-block">
    <h4 class="aside-heading">Latest Articles</h4>

    <ContentQuery
      path="/"
      :where="{ _type: 'markdown' }"
      :only="['title', '_path', 'date']"
      :sort="{
        date: -1,
      }"
      :limit="5"
      v-slot="{ data }"
    >
      <div class="mb-10" v-for="article in data" :key="tag">
        <NuxtLink
          class="text-blue-400 hover:underline"
          :to="$articleLink(article._path)"
          :tag="article._path"
        >
          {{ article.title }}
        </NuxtLink>
        <Pill class="float-right" :pill="$displayDate(article.date)" />
      </div>
    </ContentQuery>
  </div>
</template>
