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
                        class="ml-3"
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
                    Alternate Contact Info:
                    {{ edit_person.secondaryPhone }}
                    {{ edit_person.secondaryEmail }}
                  </div>
                  <div class="card-header-subtitle">
                    {{ edit_person.person_notes }}
                    <v-btn
                        icon
                        small
                        class="ml-3"
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
      <v-col
        ><!------------------middle column-------------->
        <NoteDialog v-model="showNoteDialog" :item="view_note_item" />
        <!--------------------------Notes and History-------------------------------->
        <template>
          <v-card>
            <!-- <v-card-subtitle class="pt-4">
                    <v-row>
                        <v-col>
                            <v-text-field
                            placeholder="Search"
                            v-model="note_search"
                            append-icon="mdi-magnify"
                            ></v-text-field>
                        </v-col> -->
            <!-- <v-col
                        class="col-3"
                        >
                            <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="formattedStartDate"
                                    label="Start Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="start_date"
                                @input="menu1 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col> -->
            <!-- <v-col
                        class="col-3"
                        >
                            <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            > -->
            <!-- <template v-slot:activator="{ on, attrs }"> -->
            <!---------v-model="end_date"---------------->
            <!-- <v-text-field
                                v-model="formattedEndDate"
                                label="End Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                ></v-text-field>
                            </template> 
                            <v-date-picker
                            v-model="end_date"
                            @input="menu2 = false"
                            ></v-date-picker>-->
            <!-- </v-menu>
                    </v-col> -->
            <!-- hidden switch for general or contact history -->
            <!-- <v-col>
                        <v-switch
                        v-model="history_switch"
                        :label="switch_label()"
                        color="#B71C1C"
                        hide-details
                        @change="set_notes_view"
                        ></v-switch>
                    </v-col> 
                </v-row>  
            </v-card-subtitle>-->

            <!--            						</v-card>-->
            <!--            						</template>-->

            <!--            <v-divider></v-divider>-->
            <!--            <v-virtual-scroll-->
            <!--                :items="filteredList"-->
            <!--                :item-height="50"-->
            <!--                height="300"-->
            <!--            >-->
            <!--              <template v-slot:default="{ item }">-->
            <!--                <v-list-item>-->

            <!--                  <v-list-item-content>-->
            <!--                    <v-list-item-title class="font-weight-thin">-->
            <!--                      Author: {{ item.author.first_name }} {{ item.author.last_name }} - {{ item.date }}-->
            <!--                    </v-list-item-title>-->
            <!--                    <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>-->
            <!--                  </v-list-item-content>-->

            <!--                  <v-list-item-action>-->
            <!--                    &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;New Note Dialog&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
            <!--                    <v-btn-->
            <!--                        depressed-->
            <!--                        small-->
            <!--                        @click.stop="openNoteDialog(item)"-->
            <!--                    >-->
            <!--                      Open-->
            <!--                      <v-icon-->
            <!--                          color="orange darken-4"-->
            <!--                          right-->
            <!--                      >-->
            <!--                        mdi-open-in-new-->
            <!--                      </v-icon>-->
            <!--                    </v-btn>-->
            <!--                  </v-list-item-action>-->
            <!--                </v-list-item>-->
            <!--              </template>-->
            <!--            </v-virtual-scroll>-->
          </v-card>
        </template> </v-col
      ><!------------------------//Middle Column---------------->
    </v-row>
    <!---------------------------------Edit Contact Dialog------------------------------->
    <v-dialog
        v-model="edit_person_dlg"
        content-class="lg-dlg"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
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
            <v-btn
                text
                @click="openDialog('Delete')"
                style="background-color: #ED1B2E; color: white"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                style="background-color: #0091CD; color: white"
                depressed
                @click="edit_person_dlg = false"
            >
              Close
            </v-btn>
            <v-btn
                style="background-color: #7F181B; color: white"
                depressed
                :disabled="!valid"
                @click="openDialog('Update')"

            >
              Save Changes
            </v-btn>
            <!-----------------//edit person dialog------------------------------->
          </v-card-actions>
        </v-form>
      </v-card>
      </v-card>
    </v-dialog>
    <!-----------------add note dialog------------------------------->
    <v-dialog
        v-model="add_note_dlg"
        content-class="md-dlg"
    >
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
        <v-card
            elevation="1"
            class="pa-1"
            style="background-color: #6D6E70"
            rounded
        >
        <v-card>
          <v-card-title>
            <span class="dlg-title">Note</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="col-3">
                  <v-autocomplete
                      :items="add_note_form.types"
                      v-model="add_note_form.type"
                      label="Type"
                  ></v-autocomplete>
                </v-col>
              </v-row>
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
                style="background-color: #0091CD; color: white"
                depressed
                @click="add_note_dlg = false"
            >
              Close
            </v-btn>
            <v-btn
                style="background-color: #7F181B; color: white"
                depressed
                @click="addNote"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-card>
      </v-form>
    </v-dialog>
    <!---------------------//add note dialog--------------------------->

    <!---------------------------------Delete Point of Contact Dialog------------------------------>
    <v-dialog
        content-class="small-dlg"
        v-model="delete_poc_dialog"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
        <v-card>
          <v-btn
              text
              disabled=true
              style="color: #ED1B2E !important"
          >
            Caution
          </v-btn>
          <v-card-text>
            Are you sure you want to delete this point of contact?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="delete_poc_dialog=false"
                style="background-color: #0091CD; color: white"
                depressed
            >
              No
            </v-btn>
            <v-btn
                @click="deletePOC"
                style="background-color: #7F181B; color: white"
                depressed
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!---------------------------------//Delete Point of Contact Dialog------------------------------>

    <!---------------------------------Save Point of Contact Dialog------------------------------>
    <v-dialog
        v-model="update_poc_dialog"
        content-class="small-dlg"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
        <v-card>
          <v-btn
              text
              disabled=true
              style="color: #ED1B2E !important"
          >
            Caution
          </v-btn>
          <v-card-text>
            Are you sure you want to save these changes?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="update_poc_dialog=false"
                style="background-color: #0091CD; color: white"
                depressed
            >
              No
            </v-btn>
            <v-btn
                @click="updatePerson"
                style="background-color: #7F181B; color: white"
                depressed
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!---------------------------------//Save Point of Contact Dialog------------------------------>

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
      delete_poc_dialog: false,
      update_poc_dialog: false,
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
        type: "General",
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
      openDialog(dlg){
        switch(dlg){
          case 'Save':
            this.save_poc_dialog = true;
            break;
          case 'Delete':
            this.delete_poc_dialog = true;
            break;
          case 'Update':
            this.update_poc_dialog = true;
            break;
        }
      },
      deletePOC(){
        PersonDataService.get(this.edit_person.id)
            .then(response=>{
              let person = response.data;
              person.phones.forEach(
                  phone=>{
                    PhoneDataService
                        .delete(phone.id)
                        .catch(e=>{console.log(e)});
                  });

              person.emails.forEach(
                  email=>{
                    EmailDataService
                        .delete(email.id)
                        .catch(e=>{console.log(e)})});
              return person.id;
            }).then(id=>{
          PersonDataService.delete(id).then(
              response=>{
                this.$router.push({path: '/contacts'}).catch(err=>{console.log(err)});
                this.$toasted
                    .show("Contact has been successfully deleted",{theme: 'bubble'})
                    .goAway(1000);
              }
              ).catch(e=>{console.log(e)});

        })
            .catch(e=>{console.log(e)});
      },
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
            this.update_poc_dialog = false;
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
            var personID = this.$route.params.personId;
            //data.services = this.add_person.services;
            PersonDataService.update(personID, data).
            then(response=>{
                return response.data.id;
            })
            .then(id=>{
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
                EmailDataService.update(this.emailId, email);
                EmailDataService.update(this.email2Id, email2);
                PhoneDataService.update(this.phoneId, phone);
                PhoneDataService.update(this.phone2Id, phone2).then(response => {
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
            
