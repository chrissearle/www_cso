<script setup lang="ts">
const {data} = await useAsyncData('NavIndexCategoriesCount', () => queryCollection('content')
    .where('category', 'IS NOT NULL')
    .count()
)

const hasCategories = data.value || 0 > 0
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn to="/">
        Chris Searle
      </v-btn>
    </v-toolbar-title>

    <NavCategoriesMenu v-if="hasCategories"/>

    <v-btn class="d-none d-md-flex d-xl-none" to="/tags/">Tags</v-btn>
    <v-btn class="d-none d-md-flex d-xl-none" to="/series/">Series</v-btn>

    <v-btn class="d-none d-xl-flex" to="/tags/">All Tags</v-btn>
    <v-btn class="d-none d-xl-flex" to="/series/">All Series</v-btn>

    <v-spacer class="d-none d-md-flex"/>

    <v-btn class="d-xs-flex d-xl-none" to="/keys/">
      Keys
    </v-btn>
    <v-btn class="d-none d-xl-flex" to="/keys/">
      Cryptographic Keys
    </v-btn>

    <v-btn href="https://about.me/chrissearle"
           target="_blank">
      Other Sites
    </v-btn>
  </v-toolbar>
</template>
