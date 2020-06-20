<template>
  <div>
     <v-progress-linear
        :active="loading"
        indeterminate
        color="indigo lighten-2"
        class="ma-0"
      ></v-progress-linear>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="register">
            <v-card-text>
              <v-text-field
                label="Username"
                name="username"
                v-model="formData.username"
                prepend-icon="mdi-account"
                type="text"
                :error-messages="!!formError.username ? formError.username.join(' | ') : []"
              >
              </v-text-field>
              <v-text-field
                label="Email"
                name="email"
                v-model="formData.email"
                prepend-icon="mdi-email"
                type="text"
                :error-messages="!!formError.email ? formError.email.join(' | ') : []"
              >
              </v-text-field>
              <v-text-field
                label="Name"
                name="name"
                v-model="formData.name"
                prepend-icon="mdi-account"
                type="text"
                :error-messages="!!formError.name ? formError.name.join(' | ') : []"
              >
              </v-text-field>
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
              <v-text-field
                id="passwordConfirmation"
                label="Repeat Password"
                name="password_confirmation"
                v-model="formData.password_confirmation"
                prepend-icon="mdi-lock"
                :type="showPasswordConfirm ? 'text' : 'password'"
                :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="!!formError.password_confirmation ? formError.password_confirmation.join(' | ') : []"
                @click:append="showPasswordConfirm = !showPasswordConfirm"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="warning" :to="{ name: 'login' }">Back</v-btn>
              <v-btn color="primary" type="submit" :loading="isLoading">Register</v-btn>
            </v-card-actions>
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
      return this.$store.getters.getLoading
    },
    formError() {
      return this.$store.getters.getFormError
    }
  },
  created() {
    this.isLoggedIn()
    this.$store.dispatch('setFormError', [])
  },
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
    formData: {
      username: "",
      email: "",
      name: "",
      password: "",
      password_confirmation: ""
    },
    isLoading: false,
  }),
  methods: {
    async register() {
      this.isLoading = true
      await this.$store.dispatch('register', this.formData)
      this.isLoading = false
    },
    isLoggedIn() {
      if (this.$store.getters.getToken != null) {
        this.$router.push('/')
      }
    }
  }
}
</script>