<script setup lang="ts">
const route = useRoute()

const {data: posts} = await useAsyncData(`tagItemsList${route.params.tag}`, () => queryContent()
    .where({_type: "markdown"})
    .where({'tags': {$contains: route.params.tag}})
    .only(["_path", "title", "date", "tags", "category", "intro", "image", "embedImage", "series"])
    .sort({
      date: -1
    })
    .find())
</script>

<template>
  <Head>
    <Title>Chris Searle - Tag: {{ route.params.tag }}<</Title>
  </Head>

  <v-container>
    <h1 class="text-h3">Tag: {{ route.params.tag }}</h1>
  </v-container>

  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>
</template>


