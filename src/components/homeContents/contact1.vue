<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="secondary" dark flat>
                <v-spacer />
                <v-toolbar-title>Contact Us</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.name" label="Name" name="name" prepend-icon="mdi-account" type="text" />
                  <v-text-field v-model="form.address" id="address" label="Address" name="address" prepend-icon="mdi-home" type="text" />
                  <v-text-field v-model="form.email" id="email" label="Email" name="email" prepend-icon="mdi-email" type="text" />
                  <v-text-field v-model="form.deskripsi" label="Deskripsi" name="deskripsi" prepend-icon="mdi-comment-text" type="text" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit()" color="success">Submit</v-btn>
                <v-spacer />
              </v-card-actions>
              <v-card-actions>
                <v-spacer />
                Don't have an account?
                <v-card-actions>
                <v-btn @click="moveRegister()" color="primary">Register</v-btn>
                </v-card-actions>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
     data() {
    return {
      form: {
        name: null,
        address: null,
        email: null,
        deskripsi: null
      },
      user: new FormData()
    };
  },
    methods: {
      submit() {
      var url = this.$apiUrl + "/submit";
      this.user = new FormData();
      this.user.append("email", this.form.email);
      this.user.append("password", this.form.password);
      this.$http.post(url, this.user).then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("type", response.data.user_type);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("created", response.data.created_at);
          localStorage.setItem("id",response.data.id);
          localStorage.setItem("image",response.data.link_image);
          
          if (localStorage.getItem("token") && localStorage.getItem("type") == 1) {
                this.$router.push({ name: "dashController" });
            } else {
                this.$router.push({ name: "userController" });
            }
          
        } else {
          alert("Gagal Submit");
        }
      });
    }
       
    },
  }
</script>