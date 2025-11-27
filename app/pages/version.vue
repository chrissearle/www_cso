<script setup lang="ts">
const config = useRuntimeConfig()
const imageTag = computed(() => config.public.imageTag || 'development')
</script>

<template>
  <Head>
    <Title>Version</Title>
  </Head>

  <v-container fluid>
    <h3 class="text-h3">Version</h3>

    <p>{{ imageTag }}</p>
  </v-container>
</template>
