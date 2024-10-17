<script setup lang="ts">
const {data} = await useAsyncData('NavIndexCategoriesCount', () => queryContent().where({'category': {$exists: true}}).count())

const hasCategories = data.value || 0 > 0

</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn to="/">
        Chris Searle
      </v-btn>
    </v-toolbar-title>

    <v-btn v-if="hasCategories" class="d-none d-md-flex" to="/categories/">Categories</v-btn>
    <v-btn class="d-none d-md-flex" to="/tags/">Tags</v-btn>
    <v-btn class="d-none d-md-flex" to="/series/">Series</v-btn>

    <v-spacer class="d-none d-md-flex"/>

    <v-btn to="/keys/">
      Keys
    </v-btn>

    <v-btn href="https://about.me/chrissearle"
           target="_blank">
      Other Sites
    </v-btn>
  </v-toolbar>
</template>
