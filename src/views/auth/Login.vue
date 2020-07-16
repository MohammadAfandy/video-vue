<template>
  <div>
    <v-progress-linear :active="loading" indeterminate color="indigo lighten-2" class="ma-0"></v-progress-linear>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="login">
            <v-col cols="12" class="login-info">
              <v-alert dense type="info">
                <div>User: demo</div>
                <div>Pass: demo123</div>
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Username"
                name="username"
                v-model="formData.username"
                prepend-icon="mdi-account"
                type="text"
                :error-messages="!!formError.username ? formError.username.join(' | ') : []"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="formData.password"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="!!formError.password ? formError.password.join(' | ') : []"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="warning" :to="{ name: 'register' }">Register</v-btn>
                <v-btn color="primary" type="submit" :loading="isLoading">Login</v-btn>
              </v-card-actions>
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    formError() {
      return this.$store.getters.getFormError;
    }
  },
  created() {
    this.isLoggedIn();
    this.$store.dispatch("setFormError", []);
  },
  data: () => ({
    showPassword: false,
    formData: {
      username: "",
      password: ""
    },
    isLoading: false
  }),
  methods: {
    async login() {
      this.isLoading = true;
      await this.$store.dispatch("login", this.formData);
      this.isLoading = false;
    },
    isLoggedIn() {
      if (this.$store.getters.getToken != null) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.v-alert {
  font-size: 0.8em;
}
.login-info {
  margin-bottom: -30px;
}
</style>