<script setup>
const {data} = await useAsyncData(`content-/all`, async () => {
  const _posts = await queryContent("/").where({_type: "markdown"}).find();
  return _posts.length;
});
</script>

<template>
  <Head>
    <Title>Chris Searle - All Articles</Title>
  </Head>

  <main class="container mx-auto">
    <h2
        class="text-typography_primary text-h2 leading-h2 md:text-h3 md:leading-h3 md:m-0 mx-1"
    >
      All Articles
    </h2>
    <section id="main" class="!pt-0 !px-0">
      <ContentQuery
          path="/"
          :where="{ _type: 'markdown' }"
          :only="['_path', 'title', 'date']"
          :sort="{
          date: -1,
        }"
          v-slot="{ data }"
      >
        <BlogShortItem :data="data"/>
      </ContentQuery>
    </section>
  </main>
</template>
