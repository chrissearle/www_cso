<script setup lang="ts">
const route = useRoute()
const { safeString } = useStrings()

const slug = route.params.category

const {data: allPosts} = await useAsyncData(`Category-${slug}`, () => queryContent()
    .where({_type: "markdown"})
    .only(["_path", "title", "date", "tags", "category", "intro", "image", "embedImage", "series"])
    .sort({
      date: -1
    })
    .find())

const posts = (allPosts.value || [])
    .filter((post: { category: string }) => post.category && safeString(post.category) === slug)

const originalCategory = (posts.length > 0 && posts[0] !== undefined) ? posts[0].category : slug
</script>

<template>
  <Head>
    <Title>Category: {{ originalCategory }}</Title>
  </Head>

  <v-container>
    <h1 class="text-h3">Category: {{ originalCategory }}</h1>
  </v-container>

  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>
</template>


