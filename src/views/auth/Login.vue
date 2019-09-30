<template>
  <v-container>
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
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                label="Username"
                name="username"
                v-model="formData.username"
                prepend-icon="mdi-account"
                type="text"
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
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    formData: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      let response = await this.$store.dispatch('login', this.formData)
      if (response.status == 200) {
        this.$router.push('/')
      } else {
        alert(response.data.message)
      }
    }
  }
}
</script>