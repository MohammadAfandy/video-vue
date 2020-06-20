<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 ma-2 d-flex justify-center">User Management</h1>
    <div>
      <v-container>
            <v-row class="ma-2">
              <v-col cols="12">
                <v-data-table
                  :headers="table.headers"
                  :items="users"
                  :options.sync="options"
                  :server-items-length="userTotal"
                  :footer-props="{
                    'items-per-page-options': table.itemsPerPageOptions
                  }"
                  :loading="table.loading"
                  class="elevation-1"
                >
                  <template v-slot:item.number="{ item }">
                    {{ (table.page - 1) * table.itemsPerPage + users.map(v => v.id).indexOf(item.id) + 1 }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      class="mx-1 xtra-small"
                      fab
                      dark
                      color="success"
                      :to="{ name: 'user-detail', params: {id: item.id} }"
                    >
                      <v-icon dark>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-1 xtra-small"
                      fab
                      dark
                      color="indigo"
                      :to="{ name: 'user-edit', params: { id: item.id } }"
                    >
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-1 xtra-small" fab dark color="error" @click="deleteUser(item)">
                      <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>

export default {
  watch: {
    options: {
      handler() {
        this.getUsers();
      },
      deep: true
    }
  },
  data() {
    return {
      breadCrumbsItems: [
        { text: "Home", to: { name: "home" }, disabled: false },
        { text: "User", to: { name: "user" }, disabled: true }
      ],
      table: {
        headers: [
          { text: "No", value: "number", width: "5%" },
          { text: "Username", value: "username", width: "20%" },
          { text: "Name", value: "name", width: "15%" },
          { text: "Role", value: "role", width: "15%" },
          { text: "Created", value: "created_at", width: "15%" },
          { text: "Updated", value: "updated_at", width: "15%" },
          { text: "#", value: "actions", width: "20%", sortable: false }
        ],
        loading: true,
        itemsPerPageOptions: [10, 15, 20, 50, 75, 100],
        page: 1,
        itemsPerPage: 10
      },
      users: [],
      userTotal: 0,
      options: {},
    };
  },
  methods: {
    async getUsers() {
      this.table.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      await this.$store.dispatch("fetchUsers", {
        page: page || 1,
        limit: itemsPerPage || 10,
        sort: sortDesc == 'true' ? sortBy + ':desc' : sortBy
      });
      let items = this.$store.getters.getUsers;
      const total = this.$store.getters.getUserTotal;

      this.users = items;
      this.userTotal = total;
      this.table.page = page;
      this.table.itemsPerPage = itemsPerPage;
      this.table.loading = false;
    },
    async deleteUser(user) {
      if (confirm("Are you sure want to delete user " + user.name + " ?")) {
        await this.$store.dispatch("deleteUser", user);
        this.getUsers()
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