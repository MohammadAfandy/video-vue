<template>
  <v-container>
    <h1 class="display-3 ma-4 d-flex justify-center">VIDEO</h1>
    <div class="d-flex flex-wrap">
      <v-col
        md="4" cols="12"
        v-for="video in videos"
        :key="video.id"
      >
        <v-card
          :to = "{ name: 'video-detail' , params: { id: video.id }}"
          class="mx-auto"
          width="350"
          height="500"
        >
          <v-img
            :src="video.thumbnail"
            class="white--text"
            height="200px"
          >
          </v-img>
          <v-card-text><b>{{ video.name }}</b></v-card-text>
          <v-card-text>
            <span>{{ video.description | abbreviate }}</span>
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="orange"
            >
              Share
            </v-btn>
            <v-btn
              text
              color="orange"
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchVideos')
  },
  computed: {
    videos() {
      return this.$store.getters.getVideos
    }
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 297) + (text.length >= 300 ? "..." : "")
    }
  }
}
</script>

<style>

</style>