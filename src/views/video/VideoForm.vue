<template>
  <div>
    <v-form @submit.prevent="formActions">
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col>
              <v-text-field
                v-model="video.name"
                label="Name"
                placeholder="Insert video name here ..."
                counter="200"
                outlined
                :error-messages="!!formError.name ? formError.name.join(' | ') : []"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="video.url"
                label="Video URL"
                placeholder="Insert video url here ..."
                outlined
                :error-messages="!!formError.url ? formError.url.join(' | ') : []"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="video.thumbnail"
                label="Thumbnail URL"
                placeholder="Insert thumbnail url here ..."
                outlined
                :error-messages="!!formError.thumbnail ? formError.thumbnail.join(' | ') : []"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                v-model="video.description"
                label="Description"
                placeholder="Insert description here ..."
                counter="500"
                auto-grow
                row-height="25"
                outlined
                :error-messages="!!formError.description ? formError.description.join(' | ') : []"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <VideoCard :video="video" :videoDetail="false" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="error" class="mr-3" @click="goBack">Back</v-btn>
          <v-btn color="success" type="submit" :loading="btnSubmit.isLoading">{{ btnSubmit.text }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import VideoCard from "@/views/video/VideoCard";

export default {
  props: ["video", "formActions", "btnSubmit"],
  created() {
    this.$store.dispatch('setFormError', [])
  },
  computed: {
    formError() {
      return this.$store.getters.getFormError
    }
  },
  components: {
    VideoCard
  },
  data: () => ({
    
  }),
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style>
</style>