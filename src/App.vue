<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/views/Navbar.vue'
import FrontNav from '@/_frontNav.js'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    showNavbar() {
      return !FrontNav.includes(this.$route.name)
    }
  },
};
</script>
