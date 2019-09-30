<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        v-for="item in items"
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
    </v-app-bar>

  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      {
        name: "Home",
        url: "/",
        icon: 'mdi-home'
      },
      {
        name: "Video",
        url: "/video",
        icon: 'mdi-video'
      }
    ]
  })
}
</script>

<style>

</style>