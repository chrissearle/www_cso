<script setup lang="ts">
const {seriesLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('Series', () => queryCollection('content')
    .where('series', 'IS NOT NULL')
    .order('series', 'ASC')
    .all()
)

const series = countSplitList((data.value ?? []).map((s) => s.series))

const sortedSeries = new Map([...series].sort((a, b) => String(a[0]).localeCompare(b[0])))

const {lgAndUp} = useDisplay()

const size = computed(() => {
  return (lgAndUp.value ? 'large' : 'small')
})
</script>

<template>
  <Head>
    <Title>All Series</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
    <div v-for="[series, count] in sortedSeries">
      <v-btn :size="size" size="large" :to="seriesLink(series)">
        {{ series }}
        <template v-slot:append>
          <v-chip :size="size">{{ count }}</v-chip>
        </template>
      </v-btn>
    </div>
  </v-container>
</template>
