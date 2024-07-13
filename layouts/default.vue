<template>
  <div>
    <NavBar />

    <div
      class="grid min-h-screen grid-cols-[1fr_auto] justify-center gap-4 overflow-hidden p-4"
    >
      <slot />

      <aside class="md:flex hidden h-[calc(100vh_-_2rem)] w-40 flex-col items-start py-6">
        <NavBrowse />

        <NavTags />

        <NavLatest />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.aside-heading {
  @apply text-h4 md:text-h5;
}

.aside-block {
  @apply mb-4;
}
</style>
<script setup lang="ts">
</script>