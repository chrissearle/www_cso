<script setup lang="ts">

const {data} = await useAsyncData('NavFooterCategoriesCount', () => queryContent().where({'category': {$exists: true}}).count())

const hasCategories = data.value || 0 > 0
</script>

<template>
  <v-footer class="d-flex flex justify-center ga-3">
    <v-btn v-if="hasCategories" to="/categories/">Categories</v-btn>
    <v-btn to="/tags/">Tags</v-btn>
    <v-btn to="/series/">Series</v-btn>
  </v-footer>
</template>
