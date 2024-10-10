<script setup lang="ts">
import type {ParsedContent} from '@nuxt/content'

const {seriesLink, categoryLink} = useLinks()
const {dateFormat} = useDates()

const props = defineProps<{
  post: Pick<ParsedContent, "image" | "title" | "date" | "tags" | "embedImage" | "intro" | "_path" | "category" | "series">
}>()
</script>

<template>
  <v-card class="post">
    <v-card-title>
      <NuxtLink :to="`${props.post._path}/`">
        {{ props.post.title }}
      </NuxtLink>
    </v-card-title>

    <v-card-subtitle>
      {{ dateFormat(props.post.date) }}
      <v-btn class="mx-5" v-if="post.series" :to="seriesLink(post.series)" prepend-icon="mdi-group">{{ post.series }}</v-btn>
      <v-btn class="mx-5" v-if="post.category" :to="categoryLink(post.category)" prepend-icon="mdi-shape">{{ post.category }}</v-btn>
    </v-card-subtitle>

    <v-card-text>
      <TagsList :tags="props.post.tags"/>
    </v-card-text>

    <v-card-text class="d-flex flex ga-5 justify-start text-wrap">
      <div class="postImg" v-if="props.post.image || props.post.embedImage">
        <v-img v-if="props.post.image" :src="props.post.image"/>

        <v-img v-if="props.post.embedImage" :src="props.post.embedImage"/>
      </div>
      <div>
        {{ props.post.intro }}
      </div>
    </v-card-text>

  </v-card>
</template>

<style scoped>
.post {
  width: 45%
}

.postImg {
  width: 40%;
  max-height: 200px;
}
</style>