<script setup lang="ts">
const route = useRoute()
const { safeString } = useStrings()

const slug = route.params.series

const {data: allPosts} = await useAsyncData(`Series-${slug}`, () => queryContent()
    .where({_type: "markdown"})
    .only(["_path", "title", "date", "tags", "category", "intro", "image", "embedImage", "series"])
    .sort({
      date: -1
    })
    .find())

const posts = (allPosts.value || [])
    .filter((post: { series: string }) => post.series && safeString(post.series) === slug)

const originalSeries = (posts.length > 0 && posts[0] !== undefined) ? posts[0].series : slug

</script>

<template>
  <Head>
    <Title>Series: {{ originalSeries }}</Title>
  </Head>

  <v-container>
    <h1 class="text-h3">Series: {{ originalSeries }}</h1>
  </v-container>

  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>
</template>


