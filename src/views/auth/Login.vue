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
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    this.isLoggedIn()
  },
  data: () => ({
    showPassword: false,
    formData: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      this.$store.dispatch('setLoading', true)
      let response = await this.$store.dispatch('login', this.formData)
      if (response.status == 200) {
        setTimeout(() => {
          this.$router.push('/') 
          this.$store.dispatch('setLoading', false)
        }, 1000)
      } else {
        alert(response.data.message)
        this.$store.dispatch('setLoading', false)
      }
    },
    async fetchUserInfo() {
      let response = await this.$store.dispatch('fetchUserInfo')
      if (response.status == 200) {
        window.location.href = '/'
      } else {
        alert(response.data.message)
      }
    },
    isLoggedIn() {
      if (this.$store.getters.getToken != null) {
        this.$router.push('/')
      }
    }
  }
}
</script>