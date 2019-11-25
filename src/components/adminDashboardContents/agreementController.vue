<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Agreement Data</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        >
                        <v-icon size="18" class="mr-2">mdi-book</v-icon>
                            Make a Report
                        </v-btn>
                        
                    </v-flex>
                    <v-flex xs6 class="text-right"> 
                        <v-text-field 
                            v-model="keyword"
                            append-icon="mdi-search"
                            label="Search" 
                            hide-details 
                        ></v-text-field>
                    </v-flex> 
                </v-layout> 
            
                <v-data-table 
                    :headers="headers" 
                    :items="agreements" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.user_name }}</td> 
                                <td>{{ item.dokter_name}}</td>
                                <td>{{ item.tanggalJanji}}</td>
                                <td>{{ item.rumahSakit_name}}</td>
                                <td>{{ item.keluhan}}</td>
                                <td> 
                                    <v-btn 
                                        icon 
                                        color="indigo" 
                                        light 
                                        @click="editHandler(item)" 
                                    > 
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn
                                        icon
                                        color="error"
                                        light 
                                        @click="deleteData(item.id)"
                                    > 
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn> 
                                </td> 
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table> 
            </v-container> 
        </v-card> 
        
        <v-snackbar 
            v-model="snackbar"
            :color="color" 
            :multi-line="true" 
            :timeout="3000"
        > 
            {{ text }} 
            <v-btn 
                dark 
                text 
                @click="snackbar = false" 
            > 
                Close
            </v-btn> 
        </v-snackbar> 
    </v-container> 
</template> 

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            keyword: '',
            users: [],
            doctors: [],
            rumahSakits: [],
            temp: {
                user_id : '',
                doctor_id : '',
                rumahSakit_id : '',
            },
            headers: [ 
                { 
                    text: 'No', 
                    value: 'no', 
                }, 
                { 
                    text: 'Name Customer', 
                    value: 'nameCustomer' 
                }, 
                { 
                    text: 'Name Doctor', 
                    value: 'nameDoctor' 
                }, 
                { 
                    text: 'Booking Date', 
                    value: 'bookingDate' 
                },
                { 
                    text: 'Booking Place', 
                    value: 'bookingPlace' 
                }, 
                { 
                    text: 'Complaint', 
                    value: 'keluhan' 
                },
                { 
                    text: 'Aksi', 
                    value: null 
                }, 
            ], 
            agreements: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                user_name : '', 
                doctor_name : '', 
                tanggalJanji : '',
                rumahSakit_name : '',
                keluhan: '',
            }, 
            agreement : new FormData,
            user: [],
            doctor: [],
            rumahSakit : new FormData,
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        } 
    }, 
    methods:{ 
        getData(){ 
            var uri = this.$apiUrl + '/agreement' 
            this.$http.get(uri).then(response =>{ 
                this.agreements=response.data.message 
            }) 
        },
        getDataRumahUser(){ 
            var uri = this.$apiUrl + '/user' 
            this.$http.get(uri).then(response =>{ 
                this.rumahSakits=response.data.message 
            }) 
        },
        getDataRumahDokter(){ 
            var uri = this.$apiUrl + '/dokter' 
            this.$http.get(uri).then(response =>{ 
                this.rumahSakits=response.data.message 
            }) 
        },
        getDataRumahSakit(){ 
            var uri = this.$apiUrl + '/rumahSakit' 
            this.$http.get(uri).then(response =>{ 
                this.rumahSakits=response.data.message 
            }) 
        },
        sendData(){ 
            this.agreement.append('id_user', this.form.user_id); 
            this.agreement.append('id_dokter', this.form.dokter_id);
            this.agreement.append('tanggalJanji', this.form.tanggalJanji);
            this.agreement.append('id_rumahSakit', this.temp.rumahSakit_id); 
            this.agreement.append('keluhan', this.form.keluhan);
            var uri =this.$apiUrl + '/agreement' 
            this.load = true 
            this.$http.post(uri,this.agreement).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = response.data.message; //memasukkan pesan ke snackbar 
                
                this.load = false; 
                this.dialog = false 
                this.getData(); //mengambil data agreement
                this.resetForm(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
                this.load = false; 
            }) 
        }, 
        updateData(){ 
            this.agreement.append('id_user', this.form.user_id); 
            this.agreement.append('id_dokter', this.form.dokter_id);
            this.agreement.append('tanggalJanji', this.form.tanggalJanji);
            this.agreement.append('id_rumahSakit', this.temp.rumahSakit_id); 
            this.agreement.append('keluhan', this.form.keluhan);
            var uri = this.$apiUrl + '/agreement/' + this.updatedId; 
            this.load = true 
            this.$http.post(uri,this.agreement).then(response =>{
            this.snackbar = true; //mengaktifkan snackbar 
            this.color = 'green'; //memberi warna snackbar 
            this.text = response.data.message; //memasukkan pesan ke snackbar 
            
            this.load = false; this.dialog = false 
            this.getData(); //mengambil data agreement
            this.resetForm(); this.typeInput = 'new'; 
        }).catch(error =>{ 
            this.errors = error 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red'; 
            this.load = false; 
            this.typeInput = 'new'; 
            }) 
        },
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.name = item.name; 
            this.form.spesialis = item.spesialis; 
            this.form.image = item.image, 
            this.updatedId = item.id 
        },
        change(item){ 
            this.typeInput = 'edit';
            this.temp.rumahSakit_id = item.id;
            this.temp.user_id = item.id;
            this.temp.dokter_id = item.id;
        },
        deleteData(deleteId){ //mengahapus data 
            var uri = this.$apiUrl + '/agreement/' + deleteId; //data dihapus berdasarkan id 
            
            this.$http.delete(uri).then(response =>{ 
                this.snackbar = true; 
                this.text = response.data.message; 
                this.color = 'green' 
                this.deleteDialog = false; 
                this.getData(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
            }) 
        }, 
        setForm(){ 
            if (this.typeInput === 'new') { 
                this.sendData() 
            } else { 
                console.log("dddd")
                this.updateData() 
            } 
        }, 
        resetForm(){ 
            this.form = { 
                user : '', 
                dokter : '',
                tanggalJanji : '',
                rumahSakit : '',
                keluhan: '',
            } 
        } 
    }, 
    mounted(){ 
        this.getData();
        this.getDataRumahUser();
        this.getDataRumahDokter();
        this.getDataRumahSakit();
    }, 
} 
</script>