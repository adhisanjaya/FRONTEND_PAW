<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="greydarken-3" dark app clipped fixed temporary>
            <v-list-item>
                <img src="../assets/marijuana.png" style="height:45px;width:45px">
                <v-list-item-content>
                    <v-list-item-title class="title" style="margin-left:10px;">
                        The High Five
                    </v-list-item-title>
                    <v-list-item-subtitle style="margin-left:10px;">
                        {{ name }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link @click="$router.push(item.to)">
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
                    <v-btn block @click="logout">Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar dark app fixed clipped-left height="70px" color="grey darken-3">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <VSpacer />

            <img src="../assets/marijuana.png" style="height:45px;width:45px">

        </v-app-bar>

        <VContent>
            <router-view />
        </VContent>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
                items: [{
                        title: 'Dashboard',
                        icon: 'mdi-account',
                        to: "/dashController"
                    },
                    {
                        title: 'Shop Drug',
                        icon: 'mdi-pill',
                        to: "/shopController"
                    },
                    {
                        title: 'Shop Bong',
                        icon: 'mdi-flask-outline',
                        to: "/shopBongController"
                    },
                    {
                        title: 'Cart',
                        icon: 'mdi-cart',
                        to: "/cartController"
                    }, 
                ],
            }
        },
        created(){
        this.name = localStorage.getItem("name")
        this.id = localStorage.getItem("id")
        },
        methods: {
            logout(){
                localStorage.removeItem("token")
                localStorage.removeItem("id")
                localStorage.removeItem("type")
                
                localStorage.removeItem("name")
                localStorage.removeItem("email")
                localStorage.removeItem("created")
                var uri = this.$apiUrl + '/chart/-1'; //hapus semua data
                this.$http.delete(uri).then(response => {
                    this.snackbar = true;
                    this.text = response.data.message;
                    this.color = 'green'
                    this.deleteDialog = false;
                    this.getData();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                })
                this.$router.push({name : "Login"})
            },
    }
}
</script>