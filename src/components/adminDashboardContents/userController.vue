<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Customer Data</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Add Customer
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
                    :items="users" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.name }}</td> 
                                <td>{{ item.email}}</td> 
                                <td>{{ item.password }}</td>
                                <td>{{ item.tempatLahir }}, {{ item.tanggalLahir }}</td>
                                <td>{{ item.umur }}</td>
                                <td>{{ item.jenisKelamin }}</td>
                                <td>{{ item.bpjs }}</td>
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
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Customer Profile</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="Name*" v-model="form.name" clearable required></v-text-field> 
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="Email*" v-model="form.email" clearable required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="Password*" v-model="form.password" type="password" clearable required></v-text-field> 
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="Place of birth*" v-model="form.tempatLahir" clearable required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="date"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        label="Date of birth*"
                                        readonly
                                        v-on="on"
                                        v-model="form.tanggalLahir" clearable required
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.tanggalLahir" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field type="number" label="Age*" v-model="form.umur" clearable required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="itemsKelamin" label="Gender*" dense v-model="form.jenisKelamin"  required
                                ></v-select> 
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="itemsBPJS" label="BPJS*" dense v-model="form.bpjs" required
                                ></v-select>
                            </v-col>
                        </v-row> 
                    </v-container>
                    <small>*indicates required field</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> 
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
                </v-card-actions> 
            </v-card> 
        </v-dialog> 
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
            user : new FormData, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
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
        sendData(){ 
            this.user.append('name', this.form.name); 
            this.user.append('email', this.form.email); 
            this.user.append('password', this.form.password);
            this.user.append('tempatLahir', this.form.tempatLahir);
            this.user.append('tanggalLahir', this.form.tanggalLahir);
            this.user.append('umur', this.form.umur);
            this.user.append('jenisKelamin', this.form.jenisKelamin);
            this.user.append('bpjs', this.form.bpjs);

            var config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }

            var uri =this.$apiUrl + '/user' 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = response.data.message; //memasukkan pesan ke snackbar 
                
                this.load = false; 
                this.dialog = false 
                this.getData(); //mengambil data user 
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
            this.user.append('name', this.form.name); 
            this.user.append('email', this.form.email); 
            this.user.append('password', this.form.password);
            this.user.append('tempatLahir', this.form.tempatLahir);
            this.user.append('tanggalLahir', this.form.tanggalLahir);
            this.user.append('umur', this.form.umur);
            this.user.append('jenisKelamin', this.form.jenisKelamin);
            this.user.append('bpjs', this.form.bpjs);

            var config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }

            var uri = this.$apiUrl + '/user/' + this.updatedId; 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{
            this.snackbar = true; //mengaktifkan snackbar 
            this.color = 'green'; //memberi warna snackbar 
            this.text = response.data.message; //memasukkan pesan ke snackbar 
            
            this.load = false; this.dialog = false 
            this.getData(); //mengambil data user 
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
            this.form.email = item.email; 
            this.form.password = '';
            this.form.tempatLahir = item.tempatLahir;
            this.form.tanggalLahir = item.tanggalLahir;
            this.form.umur = item.umur;
            this.form.jenisKelamin = item.jenisKelamin;
            this.form.bpjs = item.bpjs;
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //mengahapus data
            var config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }

            var uri = this.$apiUrl + '/user/' + deleteId; //data dihapus berdasarkan id 
            
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
                name : '', 
                email : '', 
                password : '',
                tempatLahir : '',
                tanggalLahir : '',
                umur : '',
                jenisKelamin : '',
                bpjs : '',
            } 
        } 
    }, 
    mounted(){ 
        this.getData(); 
    }, 
} 
</script>