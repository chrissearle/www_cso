<script setup lang="ts">
const {tagsLink} = useLinks()

const props = defineProps<{
  tags: string | string[]
}>()

</script>

<template>
  <div class="d-flex flex ga-3 flex-wrap">
    <v-btn class="text-subtitle-2 bg-teal rounded-pill" v-for="tag in props.tags" :to="tagsLink(tag)">{{ tag }}</v-btn>
  </div>
</template>