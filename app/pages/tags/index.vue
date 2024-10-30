<script setup lang="ts">
const {tagsLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('Tags', () => queryContent().where({'tags': {$exists: true}}).only('tags').find())

const tags = countSplitList((data.value ?? []).map((t) => t.tags))

const sortedTags = new Map([...tags].sort((a, b) => String(a[0]).localeCompare(b[0])))

const {lgAndUp} = useDisplay()

const size = computed(() => {
  return (lgAndUp.value ? 'large' : 'small')
})
</script>
<template>
  <Head>
    <Title>All Tags</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
  <div v-for="[tag, count] in sortedTags">
    <v-btn :size="size" :to="tagsLink(tag)">
      {{ tag }}
      <template v-slot:append>
      <v-chip :size="size">{{ count }}</v-chip>
      </template>
    </v-btn>
  </div>
  </v-container>
</template>
