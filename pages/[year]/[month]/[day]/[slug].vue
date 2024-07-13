<template>
  <main class="blog-post-text">
    <ContentDoc :path="cleanPath">
      <template v-slot="{ doc }">
        <section id="blog-title" type="header">
          <div
              class="border-typography_primary flex flex-col md:flex-row items-start md:items-center md:justify-start md:text-right mb-2 lg:mb-12 md:mb-8 gap-1 md:gap-4"
          >
            <span
                class="font-light text-typography_primary/75 dark:text-typography_primary_dark/75 pr-2"
            >
              {{ $displayDate(doc.date) }}

              <span v-if="doc.updated">
                (Updated: {{ $displayDate(doc.updated) }})
              </span>
            </span>

            <span v-for="tag in $splitList(doc.tags)" :key="tag">
              <TagsButton :tag="tag"/>
            </span>

            <span v-if="doc.series"><SeriesButton :series="doc.series"/></span>
          </div>

          <h1
              class="blog-post-text font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left"
          >
            {{ doc.title }}
          </h1>
        </section>

        <!-- Content -->
        <section
            id="main"
            class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12"
        >
          <!-- Table of Contents -->
          <aside
              class="col-span-full md:col-span-3 md:hidden"
              v-if="doc.body?.toc?.links?.length > 0"
          >
            <div class="blog-post-text blog-aside-wrapper mb-2">
              <BlogTableOfContents :links="doc.body?.toc?.links"/>
            </div>
          </aside>
          <article class="mainbody col-span-full md:col-span-7 relative">
            <!-- Update date -->

            <!-- Blog content -->
            <ContentRenderer :value="doc" class="blog-content blog-post-text"/>
          </article>

          <aside class="col-span-full md:col-span-3 blog-aside h-fit">
            <!-- Mobile Table of Content -->
            <div
                class="!hidden blog-aside-wrapper md:!flex mb-4"
                v-if="doc.body?.toc?.links?.length > 0"
            >
              <BlogTableOfContents
                  :links="doc.body?.toc?.links"
                  class="blog-post-text"
              />
            </div>

            <!-- Related articles -->
            <div
                v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0"
                class="blog-aside-wrapper"
            >
              <BlogRelatedArticles
                  :surround="data?.surround"
                  class="blog-post-text"
              />
            </div>
          </aside>
        </section>
        <!-- Scroll to top -->
        <NavScrollTopIcon/>
      </template>
      <!-- Error in case not found -->
      <template #not-found>
        {{ data }}
        <SectionsError/>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
const {$displayDate, $splitList} = useNuxtApp();
const {path, params} = useRoute();

const cleanPath =
    "/" + params.year + "/" + params.month + "/" + params.day + "-" + params.slug;

const {data, error} = await useAsyncData(`content-${cleanPath}`, async () => {
  // Remove a trailing slash in case the browser adds it, it might break the routing
  // fetch document where the document path matches with the cuurent route
  let article = queryContent("/").where({_path: cleanPath}).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent("/")
      .where({_type: "markdown"})
      .sort({date: -1})
      .only(["_path", "title", "intro"])
      .findSurround(cleanPath, {before: 1, after: 1});

  return {
    article: await article,
    surround: await surround,
  };
});

// Get the authors
const {data: authorData} = await useAsyncData("home", () =>
    queryContent("/authors").findOne()
);

// Set the meta
const baseUrl = "https://www.chrissearle.org";
const canonicalPath = baseUrl + (path + "/").replace(/\/+$/, "/");
const image = data.value?.article?.image && (baseUrl + data.value?.article?.image);

// JSON+LD
const jsonScripts = [
  {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      //mainEntityOfPage: {
      //  "@type": "WebPage",
      //  "@id": "https://example.com/",
      //},
      url: canonicalPath,
      image: image,
      headline: data.value?.article?.title,
      abstract: data.value?.article?.excerpt,
      datePublished: data.value?.article?.date,
      dateModified:
          data.value?.article?.dateUpdated || data.value?.article?.date,
      author: authorData.value['Chris Searle'],
    }),
  },
];

useHead({
  title: data.value?.article?.title,
  meta: [
    {name: 'author', content: 'Chris Searle'},
    {name: "description", content: data.value?.article?.description},
    {
      property: "article:published_time",
      content: data.value?.article?.date.split(" ")[0],
    },
    {
      hid: "og:title",
      property: "og:title",
      content: data.value?.article?.title,
    },
    {hid: "og:url", property: "og:url", content: canonicalPath},
    {
      hid: "og:description",
      property: "og:description",
      content: data.value?.article?.description,
    },
    {hid: "og:image", name: "image", property: "og:image", content: image},
    {hid: "og:type", property: "og:type", content: "Article"},
  ],
  script: jsonScripts,
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: canonicalPath,
    },
  ],
});
</script>

<style scoped>
.blog-aside {
  @apply sticky;
  top: calc(theme("spacing.nav") + 0.25rem);
}

.blog-aside-wrapper {
  @apply flex flex-col border-t-2 border-b-2 border-typography_primary py-4;
}

.blog-post-text {
  @apply text-typography_primary;
}

.separator {
  @apply mx-1;
}
</style>
