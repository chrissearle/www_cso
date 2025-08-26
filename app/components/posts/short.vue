<script setup lang="ts">
import type {ParsedContentv2} from '@nuxt/content'

const {seriesLink, categoryLink} = useLinks()
const {dateFormat} = useDates()
const {splitList} = useStrings()

const props = defineProps<{
  post: Pick<ParsedContentv2, "image" | "title" | "date" | "tags" | "embedImage" | "intro" | "path" | "category" | "series">
}>()

const categories = splitList(props.post.category)
</script>

<template>
  <v-card class="post">
    <v-card-title>
      <NuxtLink class="text-wrap" :to="`${props.post.path}/`">
        {{ props.post.title }}
      </NuxtLink>
    </v-card-title>

    <v-card-subtitle class="d-flex flex-column ga-3 align-start">
      {{ dateFormat(props.post.date) }}
      <v-btn v-if="post.series" :to="seriesLink(post.series)" prepend-icon="mdi-group">{{ post.series }}</v-btn>
      <v-btn v-for="category in categories" :to="categoryLink(category)" prepend-icon="mdi-shape">{{ category }}</v-btn>
    </v-card-subtitle>

    <v-card-text>
      <TagsList :tags="props.post.tags"/>
    </v-card-text>

    <v-card-text class="d-flex flex ga-5 justify-start text-wrap">
      <div class="postImg" v-if="props.post.image || props.post.embedImage">
        <NuxtLink class="text-wrap" :to="`${props.post.path}/`">
          <v-img v-if="props.post.image" :src="props.post.image"/>

          <v-img v-if="props.post.embedImage" :src="props.post.embedImage"/>
        </NuxtLink>
      </div>
      <div>
        {{ props.post.intro }}
      </div>
    </v-card-text>

  </v-card>
</template>

<style>
.post {
  width: 47%
}

.postImg {
  width: 40%;
  max-height: 200px;
}

@media screen and (max-width: 960px) {
  .post {
    width: 94%
  }
}
</style>
