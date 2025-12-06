<script setup lang="ts">
import type { ParsedContentv2 } from "@nuxt/content"

const { splitList } = useStrings()

const props = defineProps<{
  post: Pick<
    ParsedContentv2,
    | "image"
    | "title"
    | "date"
    | "tags"
    | "embedImage"
    | "intro"
    | "path"
    | "category"
    | "series"
  >
}>()

const opts = {
  title: props.post.title,
  ogTitle: props.post.title,
  ogType: "article",
}

if (props.post.image) {
  opts.ogImage = useSiteConfig().url + props.post.image
}

if (props.post.intro) {
  opts.ogDescription = props.post.intro
}

useSeoMeta(opts)

const categories = splitList(props.post.category)
</script>
<template>
  <div>
    <h1 class="pageTitle">{{ props.post.title }}</h1>

    <div class="mt-1 flex flex-wrap gap-2">
      <SeriesBadge v-if="post.series" :series="post.series" />
      <CategoriesBadges :categories="categories" />
      <TagsList :tags="props.post.tags" />
    </div>

    <ContentRenderer :value="props.post" />
  </div>
</template>
