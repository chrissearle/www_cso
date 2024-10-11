<script setup lang="ts">
const {categoryLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('Categories', () => queryContent().where({'category': {$exists: true}}).only('category').find())

const categories = countSplitList((data.value ?? []).map((c) => c.category))

const sortedCategroes = new Map([...categories].sort((a, b) => String(a[0]).localeCompare(b[0])))

const {lgAndUp} = useDisplay()

const size = computed(() => {
  return (lgAndUp.value ? 'large' : 'small')
})
</script>
<template>
  <Head>
    <Title>Chris Searle - All Tags</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
  <div v-for="[category, count] in sortedCategroes">
    <v-btn :size="size" size="large" :to="categoryLink(category)">
      {{ category }}
      <template v-slot:append>
      <v-chip :size="size">{{ count }}</v-chip>
      </template>
    </v-btn>
  </div>
  </v-container>
</template>
