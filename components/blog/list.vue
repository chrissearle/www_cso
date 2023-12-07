<template>
  <ul class="grid grid-cols-10 gap-4 text-typography_primary m-4">
    <li
      v-for="article in data"
      :key="article._path"
      class="col-span-full xl:col-span-5 relative rounded-md border-typography_primary hover:border-brand_primary group shadow"
    >
      <div class="p-4 block relative">
        <div class="wrapper">
          <header>
            <NuxtLink
              :to="$articleLink(article._path)"
              class="text-h3 leading-h3 font-semibold mb-4 group-hover:text-brand_primary"
            >
              {{ article.title }}
            </NuxtLink>
          </header>
          <article>
            <img
              v-if="article.image"
              class="w-1/2 float-right my-6 mx-2"
              :src="$imagePrefix(article._path) + article.image"
            />
            <p
              class="text-sm leading-sm mb-4 text-typography_primary/75 dark:text-typography_primary_dark/75"
            >
              Posted: {{ $displayDate(article.date) }}
              <span v-if="article.updated">
                / Updated: {{ $displayDate(article.updated) }}
              </span>
            </p>
            <p>{{ article.intro }}</p>
            <div v-if="article.tags" class="flex flex-wrap mt-5">
              <div v-for="tag in $splitList(article.tags)" :key="tag">
                <TagsButton :tag="tag" />
              </div>
            </div>

            <div v-if="article.series" class="flex flex-wrap">
              <div v-for="series in $splitList(article.series)" :key="series">
                <SeriesButton :series="series" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </li>
  </ul>
  <p
    v-if="data.length == 0"
    class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white"
  >
    {{ message }}
  </p>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    default:
      "There are no posts right now, but stay tuned for newer releases in the future.",
  },
});
const { $displayDate, $splitList, $imagePrefix, $articleLink } = useNuxtApp();
</script>
