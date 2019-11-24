<template>
  <v-card>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-layout column align-center>
        <v-flex class="ma-3">
          <v-avatar size="100">
            <v-img :src="profile.images ? '/api/' + profile.images : 'https://p7.hiclipart.com/preview/626/838/440/computer-icons-avatar-user-profile-contact.jpg'"></v-img>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-list v-for="item in navItems" :key="item.url" dense>
        <v-list-item :to="item.url">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>VIDEO APP</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>( {{ profile.name }} )</v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <v-btn text :to=" { name: 'profile' }">Profile</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>
              <v-btn text @click="logout">Logout</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-progress-linear :active="loading" indeterminate color="indigo lighten-2" class="ma-0"></v-progress-linear>
      <router-view />
    </v-content>
  </v-card>
</template>

<script>
import navAdmin from "@/_navAdmin";
import navUser from "@/_navUser";

export default {
  name: "container",
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    profile() {
      return {
        name: this.$store.getters.getName,
        images: this.$store.getters.getImages
      }
    }
  },
  mounted() {
    this.checkAuth();
  },
  data: () => ({
    drawer: true,
    navItems: []
  }),
  methods: {
    async checkAuth() {
      await this.$store.dispatch("fetchProfile");
      if (this.$store.getters.getToken !== null) {
        if (this.$store.getters.getProfile.role === "admin") {
          this.navItems = navAdmin.items;
        } else {
          this.navItems = navUser.items;
        }
      } else {
        this.logout();
      }
    },
    logout() {
      this.$store.dispatch("setLoading", true);
      setTimeout(() => {
        this.$store.dispatch("logout");
        this.$store.dispatch("setLoading", false);
      }, 1000);
    }
  },
  watch: {
    $route() {
      this.$store.dispatch("setLoading", true);
      setTimeout(() => {
        this.$store.dispatch("setLoading", false);
      }, 1000);
    }
  }
};
</script>

<style>
</style>