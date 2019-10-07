<template>
  <v-container>
    <h1 class="display-1 ma-4 d-flex justify-center">ADD NEW VIDEO</h1>
    <v-form @submit.prevent="add">
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.name.value"
                :label="formData.name.label"
                :hint="formData.name.hint"
                :placeholder="formData.name.placeholder"
                :counter="formData.name.counter"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.url.value"
                :label="formData.url.label"
                :hint="formData.url.hint"
                :placeholder="formData.url.placeholder"
                :counter="formData.url.counter"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.thumbnail.value"
                :label="formData.thumbnail.label"
                :hint="formData.thumbnail.hint"
                :placeholder="formData.thumbnail.placeholder"
                :counter="formData.thumbnail.counter"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                v-model="formData.description.value"
                :label="formData.description.label"
                :hint="formData.description.hint"
                :placeholder="formData.description.placeholder"
                :counter="formData.description.counter"
                auto-grow
                row-height="25"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <VideoCard :video="video" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="error" class="mr-3">Back</v-btn>
          <v-btn color="success" type="submit" :disabled="btnSubmit.disable">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import VideoCard from '@/views/video/VideoCard'

export default {
  components: {
    VideoCard
  },
  computed: {
    video() {
      return this.getVideoForm()
    }
  },
  data: () => ({
    formData: {
      name: {
        label: "Name",
        placeholder: "Insert video name here ...",
        value: "",
        counter: "50"
      },
      url: {
        label: "Video URL",
        placeholder: "Insert video url here ...",
        value: ""
      },
      thumbnail: {
        label: "Thumbnail URL",
        placeholder: "Insert thumbnail url here ...",
        value: ""
      },
      description: {
        label: "Description",
        placeholder: "Insert video description here ...",
        value: "",
        counter: "500"
      }
    },
    btnSubmit: {
      disable: false
    }
  }),
  methods: {
    async add() {
      this.btnSubmit.disable = true
      let video = this.getVideoForm(this.formData)
      await this.$store.dispatch("addVideo", video)
      this.btnSubmit.disable = false
    },
    getVideoForm() {
      let video = {}
      Object.keys(this.formData).forEach(k => video[k] = this.formData[k].value)

      return video
    }
  }
};
</script>

<style>
</style>