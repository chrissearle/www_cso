<script setup lang="ts">
const {dateFormat} = useDates()
const {splitList} = useStrings()

const props = defineProps<{
  post: Pick<ParsedContentv2, "image" | "title" | "date" | "tags" | "embedImage" | "intro" | "path" | "category" | "series">
}>()

const categories = splitList(props.post.category)
</script>

<template>
  <UPageCard>
    <template #header>
      <h3 class="text-base font-semibold">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </h3>

      <p class="text-sm text-muted">
        {{ dateFormat(post.date) }}
      </p>
    </template>

    <template #body>
      <p class="mb-4">
        {{ post.intro }}
      </p>

      <NuxtImg
          v-if="post.image || post.embedImage"
          :src="post.image || post.embedImage"
          :alt="post.title"
          class="w-full rounded-lg"
      />
    </template>

    <template #footer>
      <SeriesLink v-if="post.series" :series="post.series"/>
      <CategoriesList :categories="categories"/>
      <TagsList :tags="post.tags"/>
    </template>
  </UPageCard>
</template>
