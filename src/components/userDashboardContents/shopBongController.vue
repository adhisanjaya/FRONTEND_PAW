<template>
  <v-container>
    <v-card style="margin:20px" elevation="5">
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">The High Five Drug Store</h2>
        <v-layout row wrap style="margin:10px"></v-layout>
        <v-row>
        <v-col v-for="(item, i) in bongs" :key="i" cols="3">
          <v-card class="mx-auto" max-width="250" elevation="5" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <img :src="item.link_image" height="200" >
                <v-list-item-title class="headline text-center" v-text="item.name"></v-list-item-title>
                <v-row>
                  <v-col>
                    <div>Merk : {{item.merk}}</div>
                    <div>Type : {{item.bong_type}}</div>
                    <div>Price : {{item.price}}</div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer />
              <v-btn color="success" @click="createChart(item)">Order</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
          <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
        </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        keyword: "",
        headers: [{
            text: 'No',
            value: 'no',
          },
          {
            text: 'Bong Code',
            value: 'bong_code'
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Merk',
            value: 'merk'
          },
          {
            text: 'Bong Type',
            value: 'bong_type'
          },
          {
            text: 'Price',
            value: 'price'
          },
          {
            text: 'Link Image',
            value: 'link_image'
          },
          {
            text: 'Action',
            value: null
          },
        ],
        bongs: [],
        snackbar: false,
        color: null,
        text: "",
        load: false,
        bong: new FormData,
        updatedId: '',
      }
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + '/bong';
        this.$http.get(uri).then(response => {
          this.bongs = response.data.message;
        })
      },
      cetakPDF()
      {
        var uri = this.$apiUrl + '/cetakPDF';
        this.$http.get(uri)
      },
      createChart(item){
        this.bong.append('drug_code', item.bong_code);
        this.bong.append('name', item.name);
        this.bong.append('merk', item.merk);
        this.bong.append('drug_type', item.bong_type);
        this.bong.append('price', item.price);
        this.bong.append('link_image', item.link_image);
        var uri = this.$apiUrl + '/chart'
        this.load = true
        this.$http.post(uri, this.bong).then(response => {
          this.snackbar = true; //mengaktifkan snackbar 
          this.color = 'green'; //memberi warna snackbar 
          this.text = response.data.message; //memasukkan pesan ke snackbar 

          this.load = false;
          this.dialog = false
          //this.getData();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
      },
     
    },

    mounted() {
      this.getData();
    }

  };
</script>