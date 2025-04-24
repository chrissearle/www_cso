<script setup lang="ts">
const {categoryLink} = useLinks()
const {xlAndUp} = useDisplay()

const {data} = await useAsyncData('NavCategoriesMenu', () => queryCollection('content').where(
    'category', 'IS NOT NULL')
    .select('category')
    .all()
)

const uniqueFilter = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index;
}

const categories = data.value?.map((c) => {
  if (Array.isArray(c.category)) {
    return c.category;
  }
  return c.category.split(",");
}).flat().map((c) => c.trim()).filter(uniqueFilter).sort()

const title = computed(() => {
  return (xlAndUp.value ? 'All Categories' : 'Categories')
})
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props">{{ title }}</v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="(category, idx) in categories"
          :key="idx"
      >
        <v-list-item-title>
          <v-btn :to="categoryLink(category)">
            {{ category }}
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
