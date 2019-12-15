<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 ma-2 d-flex justify-center">VIDEO</h1>
    <div>
      <v-container>
        <v-tabs class="elevation-2">
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="tab in tabs" :key="tab" :href="`#tab-${tab}`">{{ tab }}</v-tab>
          <v-tab-item value="tab-table">
            <v-row class="ma-2">
              <v-col cols="12">
                <v-data-table
                  :headers="table.headers"
                  :items="videos"
                  :options.sync="options"
                  :server-items-length="videoTotal"
                  :footer-props="{
                    'items-per-page-options': table.itemsPerPageOptions
                  }"
                  :loading="table.loading"
                  class="elevation-1"
                >
                  <template v-slot:item.number="{ item }">
                    {{ (table.page - 1) * table.itemsPerPage + videos.map(v => v.id).indexOf(item.id) + 1 }}
                  </template>
                  <template v-slot:item.thumbnail="{ item }">
                    <v-dialog v-model="modalThumbnail" max-height="500" max-width="500">
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="item.thumbnail"
                          aspect-ratio="1"
                          contain
                          @click="openModalThumbnail(item.thumbnail)"
                          style="cursor: pointer;"
                        ></v-img>
                      </template>
                      <v-card>
                        <v-img :src="imgModalThumbnail" max-width="500" max-height="500" contain></v-img>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      class="mx-1 xtra-small"
                      fab
                      dark
                      color="success"
                      :to="{ name: 'video-detail', params: {id: item.id} }"
                    >
                      <v-icon dark>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-1 xtra-small"
                      fab
                      dark
                      color="indigo"
                      :to="{ name: 'video-edit', params: { id: item.id } }"
                    >
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-1 xtra-small" fab dark color="error" @click="deleteVideo(item)">
                      <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item value="tab-grid">
            <v-row class="ma-2">
              <v-col md="4" cols="12" v-for="video in videos" :key="video.id">
                <VideoCard :video="video" :linkDetail="true" />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import VideoCard from "@/views/video/VideoCard";

export default {
  components: {
    VideoCard
  },
  // mounted() {
    // this.getVideos();
    // this.$store.dispatch("fetchVideos");
  // },
  // computed: {
  //   videos() {
  //     return this.$store.getters.getVideos
  //   },
  //   videoTotal() {
  //     return this.$store.getters.getVideoTotal
  //   }
  // },
  watch: {
    options: {
      handler() {
        this.getVideos();
      },
      deep: true
    }
  },
  data() {
    return {
      breadCrumbsItems: [
        { text: "Home", to: { name: "home" }, disabled: false },
        { text: "Video", to: { name: "video" }, disabled: true }
      ],
      tabs: ["table", "grid"],
      table: {
        headers: [
          { text: "No", value: "number", width: "5%" },
          { text: "Name", value: "name", width: "40%" },
          // { text: "Url", value: "url", width: "15%" },
          {
            text: "Thumbnail",
            value: "thumbnail",
            width: "10%",
            sortable: false
          },
          { text: "Created", value: "created_at", width: "15%" },
          { text: "Updated", value: "updated_at", width: "15%" },
          { text: "#", value: "actions", width: "25%", sortable: false }
        ],
        loading: true,
        itemsPerPageOptions: [10, 15, 20, 50, 75, 100],
        page: 1,
        itemsPerPage: 10
      },
      videos: [],
      videoTotal: 0,
      options: {},
      modalThumbnail: false,
      imgModalThumbnail: ""
    };
  },
  methods: {
    async getVideos() {
      this.table.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      await this.$store.dispatch("fetchVideos", {
        page: page || 1,
        limit: itemsPerPage || 10,
        sort: sortDesc == 'true' ? sortBy + ':desc' : sortBy
      });
      let items = this.$store.getters.getVideos;
      const total = this.$store.getters.getVideoTotal;

      this.videos = items;
      this.videoTotal = total;
      this.table.page = page;
      this.table.itemsPerPage = itemsPerPage;
      this.table.loading = false;
    },
    openModalThumbnail(image) {
      this.modalThumbnail = true;
      this.imgModalThumbnail = image;
    },
    async deleteVideo(video) {
      if (confirm("Are you sure want to delete video " + video.name + " ?")) {
        await this.$store.dispatch("deleteVideo", video);
        this.getVideos()
      }
    }
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 297) + (text.length >= 300 ? "..." : "");
    }
  }
};
</script>

<style scoped>
.v-btn.xtra-small {
  width: 26px;
  height: 26px;
}
</style>