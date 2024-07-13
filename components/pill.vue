<script setup>
const props = defineProps({
  pill: {
    type: String,
    required: false,
  },
  count: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div
      v-if="pill || count"
      class="bg-blue-400 text-blue-100 py-1 px-2 rounded-full text-xs font-bold font-mono"
  >
    <span v-if="pill">
      {{ pill }}
    </span>
    <span v-if="count">
      {{ count }}
    </span>
  </div>
</template>
