<template>
  <header class="flex h-20 items-center bg-white shadow justify-between">
    <nav class="pl-10 pr-10 align-text-bottom">
      <NuxtLink to="/" class="text-2xl">Chris Searle</NuxtLink>
    </nav>
    <nav class="pl-10 pr-10 align-text-bottom">
      <NuxtLink to="/keys" class="hidden md:inline text-xl">Cryptographic Keys</NuxtLink>
      <NuxtLink to="/keys" class="md:hidden text-xl">Keys</NuxtLink>
      <a
          href="https://about.me/chrissearle"
          class="hidden md:inline text-xl ml-5"
          target="_blank"
          rel="noopener noreferer"
      >Other Sites</a>
      <a
          href="https://about.me/chrissearle"
          class="md:hidden text-xl ml-5"
          target="_blank"
          rel="noopener noreferer"
      >Links</a>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>