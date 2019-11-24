<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="secondary" dark flat>
                <v-spacer />
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <v-form>
                  <v-text-field label="Name" name="login" v-model="form.name" prepend-icon="mdi-account"
                    type="text" required />
                  <v-text-field label="Email*" name="email" v-model="form.email" prepend-icon="mdi-email" type="email"
                    required />
                  <v-text-field id="password" label="Password*" name="password" v-model="form.password"
                    prepend-icon="mdi-lock" type="password" required />
                  <v-text-field label="Place of birth" name="tempatLahir" v-model="form.tempatLahir" prepend-icon="mdi-map-marker" type="text"
                    required /> 
                  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        label="Date of birth"
                        readonly
                        v-on="on"
                        v-model="form.tanggalLahir" 
                        prepend-icon="mdi-calendar" clearable required
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="form.tanggalLahir" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <v-text-field label="Age" name="umur" v-model="form.umur" prepend-icon="mdi-numeric" type="number"
                    required />
                  <v-select
                    :items="itemsKelamin" label="Gender" dense v-model="form.jenisKelamin" prepend-icon="mdi-gender-male" required
                  ></v-select>
                  <v-select
                    :items="itemsBPJS" label="BPJS" dense v-model="form.bpjs" prepend-icon="mdi-format-list-bulleted" required
                  ></v-select>
                  <small>*indicates required field</small> 
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="sendData()" color="success">Register</v-btn>
                <v-spacer />
              </v-card-actions>
              <v-card-actions>
                <v-spacer />
                Already have an account?
                
                <v-card-actions>
                <v-btn @click="moveLogin()" color="primary">Login</v-btn>
                </v-card-actions>
                <v-spacer />
              </v-card-actions>
              <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        tanggalLahir: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        dialog: false,
        keyword: '',
        headers: [ 
          { 
            text: 'No', 
            value: 'no', 
          }, 
          { 
            text: 'Name', 
            value: 'name' 
          }, 
          { 
            text: 'Email', 
            value: 'email' 
          }, 
          { 
            text: 'Password', 
            value: 'password' 
          },
          { 
            text: 'Place and Date of Birth', 
            value: 'ttl' 
          },
          { 
            text: 'Age', 
            value: 'umur' 
          }, 
          { 
            text: 'Gender', 
            value: 'jenisKelamin' 
          }, 
          { 
            text: 'BPJS', 
            value: 'bpjs' 
          }, 
          { 
            text: 'Action', 
            value: null 
          }, 
        ],
        itemsKelamin: ['Laki-laki', 'Perempuan'],
        itemsBPJS: ['Ya', 'Tidak'],
        users: [],
        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
          name : '', 
          email : '', 
          password : '',
          tempatLahir : '',
          tanggalLahir : '',
          umur : '',
          jenisKelamin : '',
          bpjs : '' 
        },
        user: new FormData,
        typeInput: 'new',
        errors: '',
        updatedId: '',
      }
    },
    props: {
      source: String,
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + '/user'
        this.$http.get(uri).then(response => {
          this.users = response.data.message
        })
      },
      resetForm() {
        this.form = {
          name : '', 
          email : '', 
          password : '',
          tempatLahir : '',
          tanggalLahir : '',
          umur : '',
          jenisKelamin : '',
          bpjs : ''
        }
      },
      sendData() {
        this.user.append('name', this.form.name);
        this.user.append('email', this.form.email);
        this.user.append('password', this.form.password);
        this.user.append('tempatLahir', this.form.tempatLahir);
        this.user.append('tanggalLahir', this.form.tanggalLahir);
        this.user.append('umur', this.form.umur);
        this.user.append('jenisKelamin', this.form.jenisKelamin);
        this.user.append('bpjs', this.form.bpjs);
        this.user.append('user_type', '1');
        var uri = this.$apiUrl + '/user'
        this.load = true
        this.$http.post(uri, this.user).then(response => {
          this.snackbar = true; //mengaktifkan snackbar 
          this.color = 'green'; //memberi warna snackbar 
          this.text = response.data.message; //memasukkan pesan ke snackbar 

          this.load = false;
          this.dialog = false
          //this.getData(); //mengambil data user 
          this.resetForm();
          //this.moveLogin();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
      },
      moveLogin() {     
        setTimeout( () => this.$router.push({ path: '/'}), 500);
      }
    },
  }
</script>