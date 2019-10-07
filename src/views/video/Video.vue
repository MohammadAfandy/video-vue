<template>
  <v-container>
    <h1 class="display-3 ma-4 d-flex justify-center">VIDEO</h1>
    <div class="d-flex flex-wrap">
      <v-container>
        <v-btn
          color="primary"
          :to = "{ name: 'video-add' }"
        >
          Add New Video
        </v-btn>
      </v-container>
      <v-col md="4" cols="12" v-for="video in videos" :key="video.id">
        <VideoCard :video="video" />
      </v-col>
    </div>
  </v-container>
</template>

<script>
import VideoCard from '@/views/video/VideoCard'

export default {
  components: {
    VideoCard
  },
  mounted() {
    this.$store.dispatch('fetchVideos')
  },
  computed: {
    videos() {
      return this.$store.getters.getVideos
    }
  }
}
</script>

<style>

</style>