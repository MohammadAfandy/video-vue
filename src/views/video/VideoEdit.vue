<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 ma-4 d-flex justify-center">EDIT VIDEO - {{ videoName }}</h1>
    <VideoForm :video="video" :formActions="update" :btnSubmit="btnSubmit" />
  </v-container>
</template>

<script>
import VideoForm from '@/views/video/VideoForm'

export default {
  components: {
    VideoForm
  },
  async mounted() {
    await this.$store.dispatch('fetchVideoDetail', this.$route.params.id)
    this.video = this.$store.getters.getVideoDetail
    this.videoName = this.video.name
  },
  computed: {
    // video() {
    //   return this.$store.getters.getVideoDetail
    // },
  },
  data: () => ({
    video: {},
    videoName: "",
    breadCrumbsItems: [
      { text: "Home", to: { name: 'home' }, disabled: false },
      { text: "Video", to: { name: 'video' }, disabled: false },
      { text: "Edit", to: { name: 'video-edit' }, disabled: true },
    ],
    btnSubmit: {
      text: "Update",
      isLoading: false,
    }
  }),
  methods: {
    async update() {
      this.btnSubmit.isLoading = true
      await this.$store.dispatch("updateVideo", this.video)
      this.btnSubmit.isLoading = false
    }
  }
};
</script>

<style>
</style>