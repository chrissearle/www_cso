<script setup>
const { data } = await useAsyncData(`content-/series`, async () => {
  const _posts = await queryContent("/").where({ _type: "markdown" }).find();
  return _posts.length;
});
</script>

<template>
  <Head>
    <Title>Chris Searle - All Series</Title>
  </Head>

  <main class="container mx-auto">
    <h2
      class="text-typography_primary text-h2 leading-h2 md:text-h3 md:leading-h3"
    >
      All Series
    </h2>
    <ection id="main" class="!pt-0 !px-0">
      <ContentQuery
        path="/"
        :where="{ _type: 'markdown' }"
        :only="['series']"
        :sort="{
          date: -1,
        }"
        v-slot="{ data }"
      >
        <SeriesList :series="data" />
      </ContentQuery>
    </ection>
  </main>
</template>
