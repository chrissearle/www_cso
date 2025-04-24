<script setup lang="ts">
const {categoryLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('Categories', () => queryCollection('content')
    .where('category', 'IS NOT NULL')
    .select('category')
    .all())

const categories = countSplitList((data.value ?? []).map((c) => c.category).flat())

const sortedCategories = new Map([...categories].sort((a, b) => String(a[0]).localeCompare(b[0])))

const {lgAndUp} = useDisplay()

const size = computed(() => {
  return (lgAndUp.value ? 'large' : 'small')
})
</script>
<template>
  <Head>
    <Title>All Categories</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
    <div v-for="[category, count] in sortedCategories">
      <v-btn :size="size" :to="categoryLink(category)">
        {{ category }}
        <template v-slot:append>
          <v-chip :size="size">{{ count }}</v-chip>
        </template>
      </v-btn>
    </div>
  </v-container>
</template>
