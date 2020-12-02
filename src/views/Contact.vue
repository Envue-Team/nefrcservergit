<template>
	<v-container>
    <v-row>
      <v-col cols="12">
        <div class="red--text text--darken-4 page-title">Contact Info</div>
      </v-col>
    </v-row>
		<v-row><!---------------------First Container Row-------------------------------->
            <v-col class="col-7"><!----------------------Left Column-------------------------->
        <!---------------------Contact Basic Data-------------------------------->
                <v-row>
                  <v-col class="offset-1 col-10">
                    <v-card elevation="3">
                      <v-card-title>
                        <v-row>
                          <v-col>
                            <span class="text-h4 font-weight-thin">
                              {{edit_person.first_name+" "+edit_person.last_name}}
                            </span>
                          </v-col>
                          <v-col class="col-2">
                        <!---------------------------------Edit Contact Dialog------------------------------->
                        <v-dialog
                            v-model="edit_person_dlg"
                            max-width="600px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-hover
                                v-slot="{ hover }"
                                open-delay="200"
                            >
                              <v-btn
                                  icon
                                  :elevation="hover ? 16 : 2"
                                  :class="{ 'on-hover': hover }"
                                  v-bind="attrs"
                                  v-on="on"
                              >
                                <v-icon>
                                  mdi-pencil
                                </v-icon>
                              </v-btn>
                            </v-hover>
                          </template>
                          <v-card>
                            <v-form>
                              <v-card-title>
                                <span class="headline">Contact Information</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                    >
                                      <v-text-field
                                          label="First Name"
                                          required
                                          v-model="edit_person.first_name"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                    >
                                      <v-text-field
                                          label="Last Name"
                                          required
                                          v-model="edit_person.last_name"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="6"
                                        sm="6"
                                        md="6"
                                    >
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                      <v-text-field
                                          label="Street Number"
                                          v-model="edit_person.street_number"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                      <v-text-field
                                          label="Street Name"
                                          v-model="edit_person.street_name"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                        cols="3"
                                        sm="6"
                                        md="4"
                                    >
                                      <v-text-field
                                          label="City"
                                          v-model="edit_person.city"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                      <v-text-field
                                          label="State"
                                          v-model="edit_person.state"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                      <v-text-field
                                          label="Zip"
                                          v-model="edit_person.zip"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                          label="County"
                                          v-model="edit_person.county"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                          label="Primary Phone"
                                          v-model="edit_person.primaryPhone"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                          label="Secondary Phone"
                                          v-model="edit_person.secondaryPhone"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                          label="Primary Email"
                                          v-model="edit_person.primaryEmail"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                          label="Secondary Email"
                                          v-model="edit_person.secondaryEmail"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="edit_person_dlg=false"
                                >
                                  Close
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="updatePerson"
                                >
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                          </v-card>
                        </v-dialog>
                          </v-col>

                        </v-row>
                      </v-card-title>
                      <v-card-subtitle>
                        {{edit_person.primaryPhone}} |  {{edit_person.primaryEmail}}
                      </v-card-subtitle>
                      <v-divider></v-divider>
                      <v-card-text>
                        <address class="text-capitalize">
                          {{ edit_person.street_number }} {{ edit_person.street_name }}<br/>
                          {{ edit_person.city }}, {{ edit_person.state }} {{ edit_person.zip }}<br/>
                          County of {{edit_person.county}}<br/>
                        </address>
                        Alternate Contact Info
                        {{edit_person.secondaryPhone}}
                        {{edit_person.secondaryEmail}}
                      </v-card-text>
                    </v-card>

                  </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import PhoneDataService from "../services/PhoneDataService";
import EmailDataService from "../services/EmailDataService";
import PersonDataService from "../services/PersonDataService";


export default {
  name: "contact",
    data() {
        return {
            edit_person_dlg: false,
            phoneId: '',
            phone2Id: '',
            emailId: '',
            email2Id: '',
            person: {
                first_name: '',
                last_name:'',
                street_number: '',
                street_name: '',
                city: '', 
                state: '', 
                zip: '',
                county: '',
                primaryPhone: '',
                secondaryPhone: '',
                primaryEmail: '',
                secondaryEmail: '',
            },
            edit_person: {
                first_name: '',
                last_name:'',
                street_number: '',
                street_name: '',
                city: '', 
                state: '', 
                zip: '',
                county: '',
                primaryPhone: '',
                secondaryPhone: '',
                primaryEmail: '',
                secondaryEmail: '',
            },
        }
    },
    methods: {
        showDialog() {
            this.edit_person_dlg = true;
        },
        setPerson() {
            PersonDataService.get(this.$route.params.personId)
			.then(response => {
				// this.notes = response.data.notes.map(note=>{
				// 	var date = Intl.DateTimeFormat('en-US').format(new Date(note.createdAt));
				// 	return {
				// 		id: note.id,
				// 		text: note.text,
				// 		date: date,
				// 		author: note.person,
				// 		type: note.type
				// 	}
				// });
                // console.log(response.data);
                this.edit_person = response.data;
                response.data.phones.forEach(phone => {
                    if(phone.isPrimary) {
                        this.edit_person.primaryPhone = phone.number;
                        this.phoneId = phone.id;
                    }
                    else {
                        this.edit_person.secondaryPhone = phone.number;
                        this.phone2Id = phone.id;
                    }
                });
                response.data.emails.forEach(email => {
                    if(email.isPrimary) {
                        this.edit_person.primaryEmail = email.address;
                        this.emailId = email.id;
                    }
                    else {
                        this.edit_person.secondaryEmail = email.address;
                        this.email2Id = email.id;
                    }
                });
			})
			.catch(e => {
				console.log(e.message);
            });
        },
        updatePerson() {
            var data = {
                "first_name": this.edit_person.first_name,
                "last_name": this.edit_person.last_name,
                "street_number": this.edit_person.street_number,
                "street_name": this.edit_person.street_name,
                "city": this.edit_person.city,
                "state":this.edit_person.state,
                "zip":this.edit_person.zip,
                "county":this.edit_person.county,
            };
            console.log(data);
            var personID = this.$route.params.personId;
            //data.services = this.add_person.services;
            PersonDataService.update(personID, data).
            then(response=>{
                // console.log(response);
                //this.retrieveVolunteers();
                return response.data.id;
            })
            .then(id=>{
                console.log(id);
                var email = {
                    address: this.edit_person.primaryEmail,
                    isPrimary: true
                };
                var email2 = {
                    address: this.edit_person.secondaryEmail,
                    isPrimary: false
                };
                var phone = {
                    number: this.edit_person.primaryPhone,
                    isPrimary: true
                };
                var phone2 = {
                    number: this.edit_person.secondaryPhone,
                    isPrimary: false
                }
                console.log(phone2);
                EmailDataService.update(this.emailId, email);
                EmailDataService.update(this.email2Id, email2);
                PhoneDataService.update(this.phoneId, phone);
                PhoneDataService.update(this.phone2Id, phone2).then(response => {
                console.log(response)
                });
            })
            .catch(e=>{
                console.log(e);
            });            
            this.edit_person_dlg = false;
        }
    },
    mounted() {
        this.setPerson();
    },
}
</script>
            
        