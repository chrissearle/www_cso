<script setup>
const { params } = useRoute();
</script>

<template>
  <h1 class="todo">{{ params.series }}</h1>
</template>
