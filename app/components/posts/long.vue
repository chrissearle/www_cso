<script setup lang="ts">
import type {ParsedContentv2} from '@nuxt/content'

const {dateFormat} = useDates()
const {seriesLink, categoryLink} = useLinks()
const {splitList} = useStrings()

const props = defineProps<{
  post: Pick<ParsedContentv2, "image" | "title" | "date" | "tags" | "embedImage" | "intro" | "path" | "category" | "series">
}>()

let opts = {
  title: props.post.title,
  ogTitle: props.post.title,
  ogType: 'article'
};

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
  <div class="pa-10">
    <v-card>
      <v-card-title>{{ props.post.title }}</v-card-title>

      <v-card-subtitle class="d-flex flex-wrap flex align-center">
        {{ dateFormat(props.post.date) }}
        <v-btn class="mx-5" v-if="props.post.series" :to="seriesLink(props.post.series)" prepend-icon="mdi-group">{{ props.post.series }}</v-btn>
        <v-btn class="mx-5" v-for="category in categories" :to="categoryLink(category)" prepend-icon="mdi-shape">{{ category }}</v-btn>
      </v-card-subtitle>

      <v-card-text>
        <tags-list :tags="props.post.tags"/>
      </v-card-text>

    </v-card>

    <ContentRenderer :value="props.post"/>
  </div>
</template>

<style>
pre {
  margin: 2em;
}
</style>