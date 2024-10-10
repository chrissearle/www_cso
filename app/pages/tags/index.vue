<script setup lang="ts">
const {tagsLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('tagList', () => queryContent().where({'tags': {$exists: true}}).only('tags').find())

const tags = countSplitList((data.value ?? []).map((t) => t.tags))

const sortedTags = new Map([...tags].sort((a, b) => String(a[0]).localeCompare(b[0])))
</script>
<template>
  <Head>
    <Title>Chris Searle - All Tags</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
  <div v-for="[tag, count] in sortedTags">
    <v-btn size="large" :to="tagsLink(tag)">
      {{ tag }}
      <template v-slot:append>
      <v-chip>{{ count }}</v-chip>
      </template>
    </v-btn>
  </div>
  </v-container>
</template>
