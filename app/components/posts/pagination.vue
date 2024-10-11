<script setup lang="ts">
const {pageLink} = useLinks()

const props = defineProps<{
  currentPage: number,
  totalPages: number,
}>()
</script>

<template>
  <div class="d-flex flex flex-wrap ga-3 justify-center ma-6">
    <v-btn to="/">
      <v-icon>mdi-chevron-double-left</v-icon>
      1
    </v-btn>

    <v-btn v-for="p in props.totalPages - 2" :to="pageLink(p + 1)">
      {{ p + 1 }}
    </v-btn>

    <v-btn :to="pageLink(props.totalPages)">
      {{ props.totalPages }}
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>

  </div>
</template>
