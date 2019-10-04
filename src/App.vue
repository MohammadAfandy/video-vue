<template>
  <v-app>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.show )"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 8}px`"
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>

    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    snackbars() {
      return this.$store.getters.getSnackbars
    }
  }
};
</script>