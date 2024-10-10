<template>
  <v-container >
    <ContentDoc v-slot="{ doc }">
      <PostsLong :post="doc" />
    </ContentDoc>
  </v-container>
</template>


