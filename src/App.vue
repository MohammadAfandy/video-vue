<template>
  <v-app>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
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
    snackbar() {
      return this.$store.getters.getSnackbar
    }
  }
};
</script>