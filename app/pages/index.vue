<script setup lang="ts">
const {maxPostCount, pageCount} = usePaging()

const {data: count} = await useAsyncData('IndexCount', () => queryContent()
    .where({_type: "markdown"})
    .count())

const {data: posts} = await useAsyncData('Index', () => queryContent()
    .where({_type: "markdown"})
    .only(["_path", "title", "date", "tags", "category", "intro", "image", "embedImage", "series"])
    .sort({
      date: -1
    })
    .limit(maxPostCount)
    .find())

const totalPages = computed(() => pageCount(count.value === undefined ? 0 : count.value))
</script>

<template>
  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>

  <PostsPagination
      v-if="totalPages > 1"
      :currentPage="1"
      :totalPages="totalPages"
  />

</template>

