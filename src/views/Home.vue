<template>
  <v-container>
    <h3>Home</h3>
    <v-btn @click="logout">LOGOUT</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
      async logout() {
        await this.$store.dispatch('logout')
      }
  }
}
</script>

<style>

</style>