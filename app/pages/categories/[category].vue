<script setup lang="ts">
const route = useRoute()

const {data: posts} = await useAsyncData(`Category-${route.params.category}`, () => queryContent()
    .where({_type: "markdown"})
    .where({'category': {$contains: route.params.category}})
    .only(["_path", "title", "date", "tags", "category", "intro", "image", "embedImage", "series"])
    .sort({
      date: -1
    })
    .find())
</script>

<template>
  <Head>
    <Title>Chris Searle - Category: {{ route.params.category }}<</Title>
  </Head>

  <v-container>
    <h1 class="text-h3">Category: {{ route.params.category }}</h1>
  </v-container>

  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>
</template>


