<script setup>
const slots = useSlots()

// Hacky check for an image
const isImage = computed(() => {
  return slots.default()[0].type.tag === 'img'
})
</script>

<template>
  <div class="prose-image" v-if="isImage"><slot /></div>
  <p class="my-2" v-else><slot /></p>
</template>
