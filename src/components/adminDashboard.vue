<template>
  <div>
      <v-navigation-drawer
      v-model="drawer"
      class="grey darken-3"
      dark
      app
      clipped
      fixed
      temporary
      >
           
      <v-list-item>
        <img src="../assets/logo.png" style="height:40px;width:40px">
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-left:10px;">
            ADMIN
          </v-list-item-title>
          <v-list-item-subtitle style="margin-left:10px;">
            Welcome, {{ name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      <v-list>
        <v-list-item
        v-for="item in items"
        :key="item.title"
        link @click="$router.push(item.to)"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item> 
      </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout()">Logout</v-btn>
      </div>
    </template>
    </v-navigation-drawer>
    
    <v-app-bar 
      dark
      app
      fixed
      clipped-left
      height="70px"
      color="grey darken-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="../assets/logo.png" style="height:45px;width:45px">
      
      <v-toolbar-title 
        style="font-size: 21px;" 
        class="white--text ml-2"
      > 
        ADMIN HEALTY CONSULTANT
      </v-toolbar-title>
      <VSpacer /> 
      <!-- <v-btn text rounded>Home</v-btn>
      <v-btn text rounded>Contact Us</v-btn>
      <v-btn text rounded>About Us</v-btn>
      <v-btn text rounded>List</v-btn> -->
    </v-app-bar> 
    <VContent >
      <router-view />
    </VContent> 
  </div>
</template>

<script>
  export default { 
    data () { 
      return { 
        drawer: null, 
        items: [
          { 
            title: 'User Controller', 
            icon: 'mdi-human-male', 
            to: "/userController"
          },
          { 
            title: 'Doctor Controller', 
            icon: 'mdi-stethoscope', 
            to: "/doctorController"
          },
          { 
            title: 'Agreement Controller', 
            icon: 'mdi-book-multiple', 
            to: "/agreementController"
            },
          { 
            title: 'Hospital Controller', 
            icon: 'mdi-hospital-building', 
            to: "/rumahSakitController"
          }, 
        ], 
      } 
    },
    created(){
      this.name = localStorage.getItem("name")
    },
    methods: {
      logout(){
          localStorage.removeItem("token")
          localStorage.removeItem("type")
          this.$router.push({name : "Login"})
      },
    } 
  }
</script>