<script setup>
const blogCountLimit = 12;

const { data } = await useAsyncData(`content-/blog`, async () => {
  const _posts = await queryContent("/").where({ _type: "markdown" }).find();
  return Math.ceil(_posts.length / blogCountLimit);
});
</script>

<template>
  <Head>
    <Title>Chris Searle</Title>
  </Head>
  <main>
    <section id="main" class="!pt-0">
      <ContentQuery
        path="/"
        :where="{ _type: 'markdown' }"
        :only="[
          'title',
          'intro',
          'date',
          'tags',
          '_path',
          'image',
          'series',
          'updated',
        ]"
        :sort="{
          date: -1,
        }"
        :limit="blogCountLimit"
        v-slot="{ data }"
      >
        <div class="m-4 md:hidden">
          <NuxtLink to="/tags" class="md:hidden mx-4">Tags</NuxtLink>
          <NuxtLink to="/articles" class="md:hidden mx-4">Articles</NuxtLink>
          <NuxtLink to="/series" class="md:hidden mx-4">Series</NuxtLink>
        </div>

        <BlogList :data="data" />
      </ContentQuery>
      <BlogPagination
        v-if="data > 1"
        class="mt-8"
        :currentPage="1"
        :totalPages="data"
        :nextPage="data > 1"
        baseUrl="/"
        pageUrl="/page/"
      />
    </section>
  </main>
</template>
