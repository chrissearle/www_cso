<script setup>
const slots = useSlots()

const isImage = computed(() => {
  return slots.default()[0].type.tag === 'img'
})
</script>

<template>
  <div v-if="isImage"><slot /></div>
  <p v-else class="mt-2"><slot /></p>
</template>
