<template>
  <v-container>
    <v-breadcrumbs :items="breadCrumbsItems"></v-breadcrumbs>
    <h1 class="display-1 my-2 d-flex justify-center">Profile Page</h1>
    <v-form @submit.prevent="saveProfile">
      <v-row>
        <v-col cols="12" md="4">
          <v-card class width="350">
            <v-img class="white--text align-end" height="300px" :src="'/api/' + profile.images"></v-img>

            <v-card-text class="text--primary">
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-content>Username</v-list-item-content>
                    <v-list-item-content>{{ profile.username }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Name</v-list-item-content>
                    <v-list-item-content>{{ profile.name }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Role</v-list-item-content>
                    <v-list-item-content>{{ profile.role }}</v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.name"
                label="Name"
                counter="200"
                outlined
                :error-messages="!!formError.name ? formError.name.join(' | ') : []"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="profile.role"
                label="Role"
                outlined
                item-value="value"
                item-text="text"
                :items="roleItems"
                :error-messages="!!formError.role ? formError.role.join(' | ') : []"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-checkbox label="Change Password" @change="enableChangePassword"></v-checkbox>
          </v-row>

          <div v-show="changePassword">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password_old"
                  label="Old Password"
                  outlined
                  :type="showPasswordOld ? 'text' : 'password'"
                  :append-icon="showPasswordOld ? 'mdi-eye' : 'mdi-eye-off'"
                  :error-messages="!!formError.password_old ? formError.password_old.join(' | ') : []"
                  @click:append="showPasswordOld = !showPasswordOld"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  label="New Password"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :error-messages="!!formError.password ? formError.password.join(' | ') : []"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="password_confirmation"
                  label="Password Confirm"
                  outlined
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :error-messages="!!formError.password ? formError.password.join(' | ') : []"
                  @click:append="showPasswordConfirm = !showPasswordConfirm"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col cols="12" md="2">
              <img width="100" height="100" :src="image || 'images/avatar-1.png'" />
            </v-col>
            <v-col cols="12" md="10">
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none;"
                ref="fileInput"
                accept="images/*"
                @change="onFilePicked"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- <v-btn color="error" class="mr-3" @click="goBack">Back</v-btn> -->
          <v-btn color="success" type="submit" :disabled="btnSubmit.disable">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchProfile");
  },
  created() {
    this.$store.dispatch("setFormError", []);
  },
  computed: {
    formError() {
      return this.$store.getters.getFormError;
    },
    profile() {
      return this.$store.getters.getProfile;
    },
  },
  data() {
    return {
      breadCrumbsItems: [
        { text: "Home", to: { name: "home" }, disabled: false },
        { text: "Profile", to: { name: "profile" }, disabled: true }
      ],
      btnSubmit: {
        disable: false
      },
      roleItems: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" }
      ],
      image: null,
      changePassword: false,
      showPassword: false,
      showPasswordConfirm: false,
      showPasswordOld: false,
      password: "",
      password_old: "",
      password_confirmation: ""
    };
  },
  methods: {
    enableChangePassword() {
      this.changePassword = !this.changePassword;
      this.password = this.password_old = this.password_confirmation = "";
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        return alert("Pick a valid file");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.image = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    async saveProfile() {
      this.profile.images = this.image;
      if (this.changePassword) {
        this.profile.password = this.password;
        this.profile.password_old = this.password_old;
        this.profile.password_confirmation = this.password_confirmation;
      } else {
        this.profile.password = this.profile.password_old = this.profile.password_confirmation = undefined
      }
      await this.$store.dispatch("saveProfile", this.profile);
    }
  }
};
</script>

<style>
</style>