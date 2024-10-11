<script setup lang="ts">
const {seriesLink} = useLinks()
const {countSplitList} = useStrings()

const {data} = await useAsyncData('Series', () => queryContent().where({'series': {$exists: true}}).only('series').find())


const series = countSplitList((data.value ?? []).map((s) => s.series))

const sortedSeries = new Map([...series].sort((a, b) => String(a[0]).localeCompare(b[0])))
</script>

<template>
  <Head>
    <Title>Chris Searle - All Series</Title>
  </Head>

  <v-container class="d-flex flex flex-wrap ga-3">
    <div v-for="[series, count] in sortedSeries">
      <v-btn size="large" :to="seriesLink(series)">
        {{ series }}
        <template v-slot:append>
          <v-chip>{{ count }}</v-chip>
        </template>
      </v-btn>
    </div>
  </v-container>
</template>
