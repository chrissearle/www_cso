<script setup lang="ts">

const {maxPostCount, pageCount} = usePaging()
const route = useRoute()

const page = Number(route.params.number ?? "1")

const {data: count} = await useAsyncData(`PageCount-${page}`, () => queryCollection('content').count())

const {data: posts} = await useAsyncData(`Page-${page}`, () => queryCollection('content')
    .select("path", "title", "date", "tags", "category", "intro", "image", "embedImage")
    .order('date', 'DESC')
    .skip(maxPostCount * (page -1))
    .limit(maxPostCount)
    .all()
)

const totalPages = computed(() => pageCount(count.value === undefined ? 0 : count.value))
</script>

<template>
  <Head>
    <Title>Page {{ page }}</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
    <PostsShort v-for="post in posts" :post="post"/>
  </v-container>

  <PostsPagination
      v-if="totalPages > 1"
      :currentPage="1"
      :totalPages="totalPages"
  />

</template>

