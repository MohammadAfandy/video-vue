<template>
  <v-app>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
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
