<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="700"
      width="300%"
      :src="require('@/assets/articles/home.jpg')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs20
          md7
          offset-md0
        >
          <h1 class="display-3 font-weight-light">
            Healthy Consultant
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            Know your health,find your healthy body
          </div>
          <v-btn
            color="blue-darken"
            depressed
            rounded
            router to="/Login"
          >
            Get Started!
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
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