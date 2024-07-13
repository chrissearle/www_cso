<script setup>
const {params} = useRoute();

const blogCountLimit = 12;

const getPageLimit = (totalPosts) => {
  return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
  return Number(params.number);
};

const router = useRouter();
let pageNo;
try {
  pageNo = getPageNumber();
  if (isNaN(pageNo) || pageNo <= 0) {
    router.replace("/");
  }
} catch (err) {
  console.error(err);
  router.replace("/");
}
</script>

<template>
  <Head>
    <Title>Chris Searle - Page {{ params.number }}</Title>
  </Head>
  <main>
    <ContentQuery
        path="/"
        :where="{ _type: 'markdown' }"
        :only="[
        'title',
        'intro',
        'date',
        'tags',
        '_path',
        'image',
        'series',
        'updated',
      ]"
        :sort="{
        date: -1,
      }"
        :skip="blogCountLimit * (getPageNumber() - 1)"
        :limit="blogCountLimit"
    >
      <template v-slot="{ data }">
        <section id="main" class="!pt-0">
          <BlogList :data="data"/>
          <ContentQuery path="/" :where="{ _type: 'markdown' }">
            <template v-slot="{ data }">
              <BlogPagination
                  v-if="getPageLimit(data.length) > 1"
                  class="mt-8"
                  :currentPage="getPageNumber()"
                  :totalPages="getPageLimit(data.length)"
                  :nextPage="getPageNumber() < getPageLimit(data.length)"
                  baseUrl="/"
                  pageUrl="/page/"
              />
            </template>
            <template #not-found></template>
          </ContentQuery>
        </section>
      </template>

      <template #not-found>
        <section id="main" class="!pt-0">
          <BlogList
              :data="[]"
              message="There are no posts in this page, maybe try searching on another one."
          />
        </section>
      </template>
    </ContentQuery>
  </main>
</template>
