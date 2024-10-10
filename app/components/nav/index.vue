<script setup lang="ts">
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      <v-btn to="/">
        Chris Searle
      </v-btn>
    </v-toolbar-title>

    <NavCategories />

    <v-spacer/>

    <v-btn to="/tags/">All Tags</v-btn>
    <v-btn to="/series/">All Series</v-btn>

    <v-spacer/>

    <v-btn to="/keys/">
      Cryptographic Keys
    </v-btn>

    <v-btn href="https://about.me/chrissearle"
           target="_blank">
      Other Sites
    </v-btn>
  </v-toolbar>
</template>
