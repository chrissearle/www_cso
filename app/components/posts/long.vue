<script setup lang="ts">
import type {ParsedContent} from '@nuxt/content'

const {dateFormat} = useDates()
const {seriesLink, categoryLink} = useLinks()

const props = defineProps<{
  post: ParsedContent
}>()
</script>

<template>
  <div class="pa-10">
    <v-card>
      <v-card-title>{{ props.post.title }}</v-card-title>

      <v-card-subtitle>
        {{ dateFormat(props.post.date) }}
        <v-btn class="mx-5" v-if="post.series" :to="seriesLink(post.series)" prepend-icon="mdi-group">{{ post.series }}</v-btn>
        <v-btn class="mx-5" v-if="post.category" :to="categoryLink(post.category)" prepend-icon="mdi-shape">{{ post.category }}</v-btn>
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