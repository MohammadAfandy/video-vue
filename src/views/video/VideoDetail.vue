<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="8" cols="12">
        <video-player  class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
        >
       </video-player>
      </v-col>
      <v-col md="4" cols="12">
        <div><b>{{ video.name }}</b></div>
        <br>
        <div v-html="video.description"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
require('videojs-youtube')

export default {
  components: {
    videoPlayer
  },
  mounted() {
    this.$store.dispatch('fetchVideoDetail', this.$route.params.id)
  },
  computed: {
    video() {
      return this.$store.getters.getVideoDetail
    },
    playerOptions() {
      return {
        fluid: true,
        techOrder: ['youtube'],
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/youtube",
          src: this.video.url
        }],
        poster: this.video.thumbnail,
      }
    }
  },
  data: () => ({
    
  })
}
</script>

<style>

</style>