<template>
  <v-container>
    <v-card style="margin:20px" elevation="5">
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Your Cart</h2>
       <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"
                            @click="cetakPDF()">
                            <v-icon size="18" class="mr-2">mdi-money-printer</v-icon>
                            Get Receipt
                        
        </v-btn>
        <v-layout row wrap style="margin:10px"></v-layout>
        <v-row>
        <v-col v-for="(item, i) in charts" :key="i" cols="3">
          <v-card class="mx-auto" max-width="250" elevation="5" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <img :src="item.link_image" height="250" >
                <v-list-item-title class="headline text-center" v-text="item.name"></v-list-item-title>
                <v-row>
                  <v-col>
                    <div>Merk : {{item.merk}}</div>
                    <div>Type : {{item.drug_type}}</div>
                    <div>Price : {{item.price}}</div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer />
              <v-btn color="danger" @click="deleteChart(item.id)">Delete</v-btn>
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
            text: 'Drug Code',
            value: 'drug_code'
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
            text: 'Drug Type',
            value: 'drug_type'
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
        charts: [],
        snackbar: false,
        color: null,
        text: "",
        load: false,
        drug: new FormData,
        updatedId: '',
      }
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + '/chart';
        this.$http.get(uri).then(response => {
          this.charts = response.data.message;
        })
      },
      cetakPDF()
      {
        var uri = this.$apiUrl + '/cetakPDF';
        this.$http.get(uri)
      },
      deleteChart(deleteId) { //mengahapus data
                var uri = this.$apiUrl + '/chart/' + deleteId; //data dihapus berdasarkan id
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
            },
      purchase() {

      }
    },

    mounted() {
      this.getData();
    }

  };
</script>