<script setup lang="ts">
const { categoryLink } = useLinks()
const { countSplitList } = useStrings()

const { data: countData } = await useAsyncData(
  "NavIndexCategoriesCountBar",
  () => queryCollection("content").where("category", "IS NOT NULL").count(),
)

const { data: categoryData } = await useAsyncData("Categories", () =>
  queryCollection("content")
    .where("category", "IS NOT NULL")
    .select("category")
    .all(),
)

const countedCategories = countSplitList(
  (categoryData.value ?? []).map((c) => c.category),
)

const categories = new Map(
  [...countedCategories].sort((a, b) => String(a[0]).localeCompare(b[0])),
)

const hasCategories = computed(() => (countData.value ?? 0) > 0)

const categoryItems = computed(() => {
  return [...categories.keys()].map((c) => ({
    label: c,
    to: categoryLink(c),
  }))
})
</script>

<template>
  <header class="mb-2">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="text-lg font-semibold tracking-tight">
        Chris Searle
      </NuxtLink>

      <div class="hidden md:flex items-center gap-6">
        <UDropdownMenu v-if="hasCategories" :items="categoryItems">
          <span class="cursor-pointer text-sm font-medium hover:underline">
            <span class="hidden lg:inline">All Categories</span>
            <span class="inline lg:hidden">Categories</span>
          </span>
        </UDropdownMenu>

        <NuxtLink to="/tags" class="text-sm font-medium hover:underline">
          <span class="hidden lg:inline">All Tags</span>
          <span class="inline lg:hidden">Tags</span>
        </NuxtLink>

        <NuxtLink to="/series" class="text-sm font-medium hover:underline">
          <span class="hidden lg:inline">All Series</span>
          <span class="inline lg:hidden">Series</span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink to="/keys/" class="text-sm font-medium hover:underline">
          <span class="hidden lg:inline">Cryptographic Keys</span>
          <span class="inline lg:hidden">Keys</span>
        </NuxtLink>

        <a
          href="https://about.me/chrissearle"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium hover:underline"
        >
          Other Sites
        </a>
      </div>
    </UContainer>
  </header>
</template>
