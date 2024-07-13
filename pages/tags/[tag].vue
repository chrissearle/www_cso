<script setup>
const {params} = useRoute();

const {data} = await useAsyncData(`content-/tags`, async () => {
  const _posts = await queryContent("/").where({_type: "markdown"}).find();
  return _posts.length;
});
</script>

<template>
  <Head>
    <Title>Chris Searle - Articles with tag: {{ params.tag }}</Title>
  </Head>

  <main class="container mx-auto">
    <h2
        class="text-typography_primary text-h2 leading-h2 md:text-h3 md:leading-h3"
    >
      Tag: {{ params.tag }}
    </h2>
    <section id="main" class="!pt-0 !px-0">
      <ContentQuery
          path="/"
          :where="{ tags: { $contains: params.tag } }"
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
