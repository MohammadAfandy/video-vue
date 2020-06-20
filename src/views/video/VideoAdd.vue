<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 ma-4 d-flex justify-center">ADD NEW VIDEO</h1>
    <VideoForm :video="video" :formActions="add" :btnSubmit="btnSubmit" />
  </v-container>
</template>

<script>
import VideoForm from '@/views/video/VideoForm'

export default {
  components: {
    VideoForm
  },
  computed: {
  },
  data: () => ({
    breadCrumbsItems: [
      { text: "Home", to: { name: 'home' }, disabled: false },
      { text: "Video", to: { name: 'video' }, disabled: false },
      { text: "Add", to: { name: 'video-add' }, disabled: true },
    ],
    video: {},
    btnSubmit: {
      text: "Add",
      isLoading: false,
    }
  }),
  methods: {
    async add() {
      this.btnSubmit.isLoading = true
      await this.$store.dispatch("addVideo", this.video)
      this.btnSubmit.isLoading = false
    }
  }
};
</script>

<style>
</style>