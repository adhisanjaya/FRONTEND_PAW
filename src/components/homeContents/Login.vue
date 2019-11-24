<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="secondary" dark flat>
                <v-spacer />
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.email" label="Email" name="login" prepend-icon="mdi-email" type="text" />
                  <v-text-field v-model="form.password" id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="login()" color="success">Login</v-btn>
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
        email: null,
        password: null
      },
      user: new FormData()
    };
  },
    methods: {
      moveRegister() {
        this.$router.push('/Register')
      },
       login() {
      var url = this.$apiUrl + "/login";
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
          alert("Gagal Login");
        }
      });
    }
    },
   



  }
</script>