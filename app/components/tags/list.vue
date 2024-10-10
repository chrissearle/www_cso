<script setup lang="ts">
const {splitList} = useStrings()
const {tagsLink, categoryLink} = useLinks()

const props = defineProps<{
  tags: string
}>()

const tagsList = computed(() => {
  return splitList(props.tags)
})
</script>

<template>
  <div class="d-flex flex ga-3 flex-wrap">
    <v-btn class="text-subtitle-2 bg-teal rounded-pill" v-for="tag in tagsList" :to="tagsLink(tag)">{{ tag }}</v-btn>
  </div>
</template>