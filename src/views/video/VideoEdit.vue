<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 ma-4 d-flex justify-center">EDIT VIDEO - {{ video.name }}</h1>
    <VideoForm :video="video" :formActions="update" />
  </v-container>
</template>

<script>
import VideoForm from '@/views/video/VideoForm'

export default {
  components: {
    VideoForm
  },
  mounted() {
    this.$store.dispatch('fetchVideoDetail', this.$route.params.id)
  },
  computed: {
    video() {
      return this.$store.getters.getVideoDetail
    },
  },
  data: () => ({
    breadCrumbsItems: [
      { text: "Home", to: { name: 'home' }, disabled: false },
      { text: "Video", to: { name: 'video' }, disabled: false },
      { text: "Edit", to: { name: 'video-edit' }, disabled: true },
    ],
    btnSubmit: {
      disable: false
    }
  }),
  methods: {
    async update() {
      await this.$store.dispatch("updateVideo", this.video)
    }
  }
};
</script>

<style>
</style>