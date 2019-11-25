<template >
    <v-container>
        <v-card style="margin:30px" class="mx-auto" max-width="600" elevation="5" outlined>
            <v-container text-center>
                <h2 class="text-md-center">User Profile</h2>
                <v-layout row wrap style="margin:10px"></v-layout>
                <v-row align="center" justify="center">
                    <v-img
                    :src= "this.link_image"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="150"
                    max-height="150"
                    
                    ></v-img>
                </v-row>
                <v-list-item-title class="headline">{{ this.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ this.email }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ this.created_at }}</v-list-item-subtitle>

                <v-btn color="primary" @click="editHandler()" >Edit Profile</v-btn>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-spacer />
                    <span class="headline">User Profile</span>
                    <v-spacer />
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name*" v-model="form.name"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                  <v-text-field label="Image URL*" v-model="form.link_image"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="updateData()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
    
    
</template>

<script>
export default {
     data() {
            return {
                dialog: false,
                keyword: '',
                users: [],
                snackbar: false,
                color: null,
                text: '',
                load: false,
                form: {
                    name: '',
                    link_image: ''
                  
                },
                user: new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
            }
        },
        methods:{
            getData() {
            var config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
                    var uri = this.$apiUrl + '/user'
                    this.$http.get(uri,this.user,config).then(response => {
                        this.users = response.data.message
                    })
            },
            editHandler() {
                this.typeInput = 'edit';
                this.dialog = true;
                this.form.name = this.name;
                this.form.link_image = this.link_image;
                this.updatedId = this.id
            },
            
             updateData() {

                this.user.append('name', this.form.name); 
                this.user.append('email', this.email); //Untuk memenuhi rules di CI
                this.user.append('link_image', this.form.link_image);
                 this.user.append('user_type', '1');
                var uri = this.$apiUrl + '/user/' + this.updatedId;
				
				var config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                }
        }
				
                this.load = true
                this.$http.post(uri,this.user,config).then(response => {
                    this.snackbar = true;
                    this.text = response.data.message;
                    this.color = 'green'
                    localStorage.setItem("name", this.form.name);
                    localStorage.setItem("image",this.form.link_image);
                    this.name = localStorage.getItem("name")
                    this.link_image = localStorage.getItem("image")
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data user
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
            },
           

           
        },
    created(){
        this.name = localStorage.getItem("name")
        this.email = localStorage.getItem("email")
        this.created_at = localStorage.getItem("created")
        this.id = localStorage.getItem("id")
        this.link_image = localStorage.getItem("image")
        
       
    }
}
</script>