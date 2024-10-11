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

    <v-spacer class="d-none d-md-flex"/>

    <v-btn class="d-none d-md-flex" to="/tags/">All Tags</v-btn>
    <v-btn class="d-none d-md-flex" to="/series/">All Series</v-btn>

    <v-spacer class="d-none d-md-flex"/>

    <v-btn class="d-none d-md-flex" to="/keys/">
      Cryptographic Keys
    </v-btn>

    <v-btn class="d-none d-md-flex" href="https://about.me/chrissearle"
           target="_blank">
      Other Sites
    </v-btn>

    <div class="d-lg-none">
      <v-btn to="/keys/">
        Keys
      </v-btn>

      <v-btn href="https://about.me/chrissearle"
             target="_blank">
        Sites
      </v-btn>
    </div>
  </v-toolbar>
</template>
