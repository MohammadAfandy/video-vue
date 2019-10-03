<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        v-for="item in navItems"
        :key="item.url"
        dense
      >
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

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>VIDEO APP</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-progress-linear
        :active="loading"
        indeterminate
        color="indigo lighten-2"
        class="ma-0"
      ></v-progress-linear>
      <router-view />
    </v-content>

  </v-card>
</template>

<script>
import navAdmin from '@/_navAdmin'
import navUser from '@/_navUser'

export default {
  name: 'container',
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    this.checkAuth()
  },
  data: () => ({
    drawer: true,
    navItems: []
  }),
  methods: {
    async checkAuth() {
      await this.$store.dispatch('fetchUserInfo')
      if (this.$store.getters.getToken !== null) {
        if (this.$store.getters.getRole === 'admin') {
          this.navItems = navAdmin.items
        } else {
          this.navItems = navUser.items
        }
      } else {
        this.$router.push('login')
      }
    },
    logout() {
      this.$store.dispatch('setLoading', true)
      setTimeout(() => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
        this.$store.dispatch('setLoading', false)
      }, 1000)
    }
  },
  watch:{
    $route (to, from){
      this.$store.dispatch('setLoading', true)
      setTimeout(() => { this.$store.dispatch('setLoading', false) }, 1000)
    }
  } 
}
</script>

<style>

</style>