<template>
  <v-card
    :to="linkDetail ? { name: 'video-detail' , params: { id: video.id }} : ''"
    class="mx-auto"
    width="350"
    height="500"
  >
    <v-img :src="video.thumbnail" class="white--text" height="200px"></v-img>
    <v-card-text>
      <b>{{ video.name }}</b>
    </v-card-text>
    <v-card-text>
      <span>{{ video.description | abbreviate }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["video", "linkDetail"],
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 297) + (text.length >= 300 ? "..." : "");
    }
  }
};
</script>

<style>
</style>