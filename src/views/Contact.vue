<template>
  <v-container>
    <v-row
      ><!---------------------First Container Row-------------------------------->
      <v-col cols="7"
        ><!----------------------Left Column-------------------------->
        <!---------------------Contact Basic Data-------------------------------->
        <v-row>
          <v-col class="offset-1 col-0">
            <v-card
                class="pa-1 mx-7"
                outlined
                elevation="3 text-wrap">
              <v-card
                  style="margin-top:-15px; width:100%;"
                  color="#6D6E70"
                  class="pa-7"
                  rounded
              >
                <v-card-text>
                  <div class="card-header-title">{{ edit_person.first_name + " " + edit_person.last_name }}
                    <v-btn
                        icon
                        small
                        class="pl-3"
                        @click="edit_person_dlg=true"
                    >
                      <v-icon
                          small
                          class="mdi mdi-pencil"
                          style="color: #C4DFF6"
                      ></v-icon>
                    </v-btn>
                  </div>
                  <div class="card-header-subtitle">
                    {{ edit_person.primaryPhone }} | {{ edit_person.primaryEmail }}
                  </div>
                  <div class="card-header-subtitle">
                    {{ edit_person.street_number }} {{ edit_person.street_name }}<br />
                    {{ edit_person.city }}, {{ edit_person.state }}
                    {{ edit_person.zip }}<br />
                    {{ edit_person.county + " County" }}<br />
                    Affiliated Organizations: {{ edit_person.organization_names }}
                    <br />
                    <!-- Alternate Contact Info:
                    {{ edit_person.secondaryPhone }}
                    {{ edit_person.secondaryEmail }} -->
                  </div>
                  <div class="card-header-subtitle">
                    {{ edit_person.person_notes }}
                    <v-btn
                        icon
                        small
                        class="pl-3"
                        @click="add_note_dlg=true"
                    >
                      <v-icon
                          small
                          class="mdi mdi-comment-outline"
                          style="color: #C4DFF6"
                      ></v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row> </v-col
      ><!---------------------//left column ---------------------->
    </v-row>
    <!---------------------------------Edit Contact Dialog------------------------------->
    <v-dialog v-model="edit_person_dlg" max-width="600px">
      <v-card>
        <v-form v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Contact Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                      label="First Name"
                      required
                      v-model="edit_person.first_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                      label="Last Name"
                      required
                      v-model="edit_person.last_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6"> </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      label="Street Number"
                      v-model="edit_person.street_number"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      label="Street Name"
                      v-model="edit_person.street_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" sm="6" md="4">
                  <v-text-field
                      label="City"
                      v-model="edit_person.city"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-select
                      label="State"
                      v-model="edit_person.state"
                      :rules="nameRules"
                      :items="states"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                      label="Zip"
                      v-model="edit_person.zip"
                      :rules="zipRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      label="County"
                      v-model="edit_person.county"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      label="Primary Phone"
                      v-model="edit_person.primaryPhone"
                      :rules="phoneRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      label="Secondary Phone"
                      v-model="edit_person.secondaryPhone"
                      :rules="phoneRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      label="Primary Email"
                      v-model="edit_person.primaryEmail"
                      :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      label="Secondary Email"
                      v-model="edit_person.secondaryEmail"
                      :rules="emailRules"
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
                @click="edit_person_dlg = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                :disabled="!valid"
                @click="updatePerson"
            >
              Save
            </v-btn>
            <!-----------------//edit person dialog------------------------------->
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-----------------add note dialog------------------------------->
    <v-dialog v-model="add_note_dlg" max-width="600px">
<!--      <template v-slot:activator="{ on, attrs }">-->
<!--        <v-hover v-slot="{ hover }" open-delay="200">-->
<!--          <v-btn-->
<!--              color="white"-->
<!--              class="text&#45;&#45;primary"-->
<!--              fab-->
<!--              small-->
<!--              :elevation="hover ? 16 : 2"-->
<!--              :class="{ 'on-hover': hover }"-->
<!--              v-bind="attrs"-->
<!--              v-on="on"-->
<!--          >-->
<!--            <v-icon> mdi-plus </v-icon>-->
<!--          </v-btn>-->
<!--        </v-hover>-->
<!--      </template>-->
      <v-form v-model="valid_note" ref="new_note_form">
        <v-card>
          <v-card-title>
            <span class="headline">Note</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- <v-row>
                <v-col class="col-3">
                  <v-autocomplete
                      :items="add_note_form.types"
                      v-model="add_note_form.type"
                      label="Type"
                  ></v-autocomplete>
                </v-col>
              </v-row> -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                      :rules="note_text_rule"
                      v-model="add_note_form.text"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="add_note_dlg = false"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="addNote">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!---------------------//add note dialog--------------------------->
  </v-container>

</template>
<script>
import PhoneDataService from "../services/PhoneDataService";
import EmailDataService from "../services/EmailDataService";
import PersonDataService from "../services/PersonDataService";
import NoteDataService from "../services/NoteDataService";
import NoteDialog from "./NoteDialog";

export default {
  name: "contact",
  components: {
    NoteDialog,
  },
  data() {
    return {
      edit_person_dlg: false,
      showNoteDialog: false,
      phoneId: "",
      phone2Id: "",
      emailId: "",
      email2Id: "",
      // person: {
      //     first_name: '',
      //     last_name:'',
      //     street_number: '',
      //     street_name: '',
      //     city: '',
      //     state: '',
      //     zip: '',
      //     county: '',
      //     primaryPhone: '',
      //     secondaryPhone: '',
      //     primaryEmail: '',
      //     secondaryEmail: '',
      // },
      states:[
          "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT",
          "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID",
          "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME",
          "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND",
          "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK",
          "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX",
          "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV",
          "WY"
        ],
      edit_person: {
        first_name: "",
        last_name: "",
        street_number: "",
        street_name: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        organization_names: "",
        primaryPhone: "",
        secondaryPhone: "",
        primaryEmail: "",
        secondaryEmail: "",
        person_notes: "",
      },

      //notes variables
      view_note_item: {},
      note_search: "",
      history_switch: true,
      notes: [],

      //Add Note
      add_note_dlg: false,
      valid_note: true,
      note_text_rule: [(v) => !!v || "Text is required"],
      add_note_form: {
        types: ["General", "Contact"],
        text: "",
        type: "Contact",
      },
      //View Note
      view_note_dlg: false,
      notes_type_selected: {
        general: false,
        contact: true,
      },

      //Date Pickers
      menu1: false,
      menu2: false,
      start_date: new Date().toISOString().substr(0, 10),
      // end_date: ''
      end_date: new Date().toISOString().substr(0, 10),
      formattedStartDate: "",
      formattedEndDate: "",

      //Tabs
      tab: "",
      nameRules: [
        (v) => !!v || "Required",
        (v) => /\D\S$/.test(v) || "No white or empty spaces",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Phone number must be valid",
      ],
      streetNumberRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Street number must be valid",
      ],

      zipRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Zip number must be valid",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 1) || "Min 5 characters",
      },
    };
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
                console.log("logging response");
                console.log(response);
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
                this.edit_person.organization_names = '';
                response.data.organizations.forEach(organization=>{
                    this.edit_person.organization_names += organization.name+"\n";
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
        },

    //note methods

    addNote(val) {
      console.log(val);
      if (this.$refs.new_note_form.validate()) {
        var data = {
          first_name: this.edit_person.first_name,
          last_name: this.edit_person.last_name,
          street_number: this.edit_person.street_number,
          street_name: this.edit_person.street_name,
          city: this.edit_person.city,
          state: this.edit_person.state,
          zip: this.edit_person.zip,
          county: this.edit_person.county,
          person_notes: this.add_note_form.text,
        };
        var personID = this.$route.params.personId;
        //data.services = this.add_person.services;
        PersonDataService.update(personID, data)
          .then((response) => {
            // console.log(response);
            //this.retrieveVolunteers();
            console.log(response);
            this.setPerson();
          })
          .catch((e) => {
            console.log(e);
          });
        this.add_note_dlg = false;
      }
    },
    deleteNote(val) {
      NoteDataService.delete(val.id)
        .then((response) => {
          this.setPerson(this.$route.params.personId);
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      this.showNoteDialog = false;
    },

    close_note_dlg() {
      this.view_note_dlg = false;
    },
    openNoteDialog(item) {
      this.showNoteDialog = true;
      this.view_note_item = item;
    },
    setModal(item) {
      this.view_note_item = item;
      this.open_note_dlg();
    },
    switch_label() {
      return this.history_switch ? "Contact History" : "General History";
    },
    set_notes_view() {
      this.notes_type_selected.general = !this.history_switch;
      this.notes_type_selected.contact = this.history_switch;
    },
  },
  computed: {
    // filteredList() {
    //     return this.notes.filter(note => {
    //         if(note.author == null) return;
    //         let afterStart = true;
    //         let beforeEnd = true;
    //         const vDate = new Date(note.date).toISOString().substr(0, 10);
    //         if(this.formattedStartDate !== '' && this.formattedStartDate !== null){
    //             afterStart = new Date(this.formattedStartDate).toISOString().substr(0, 10) < vDate;
    //         }
    //         if(this.formattedEndDate !== '' && this.formattedEndDate !== null){
    //             beforeEnd = new Date(this.formattedEndDate).toISOString().substr(0,10) > vDate;
    //         }
    //         if(this.notes_type_selected[note.type]){
    //             return (note.thor.first_name.toLowerCase().includes(this.note_search.toLowerCase()) ||
    //             note.author.last_name.toLowerCase().includes(this.note_search.toLowerCase())) &&
    //             (afterStart && beforeEnd)
    //         }
    //     })
    // },
  },
  mounted() {
    this.setPerson();
  },
};
</script>
            
