<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="mobile-title hidden-md-and-up">Contacts</span>
        <v-card
              class="pa-3 mt-md-8 mt-sm-3"
              outlined
              elevation="3 text-wrap"
              style="background-color: rgb(249, 249, 249)"
          >
            <v-card
                style="margin-top:-40px; width:100%;"
                color="#6D6E70"
                class="pa-7 hidden-md-and-down"
                rounded
            >
              <v-toolbar-title class="card-header-title">Contacts</v-toolbar-title>
            </v-card>
          <v-card-text>
            <v-row>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  class="shrink mt-3 mr-3"
                  label="Search"
                  append-icon="mdi-magnify"
                  single-line
              ></v-text-field>
            </v-row>
            <v-data-table
                :headers="headers"
                :items="volunteers"
                :search="search"
                item-key="id"
                @click:row="nav"
                multi-sort
                class="text-capitalize"
            >
              <template v-slot:item.name="{ item }">
                <template v-if="item.first_name !== null">
                  <span class="black--text">{{ item.name }}</span>
                </template>
              </template>
              <template v-slot:item.address="{ item }">
                <address>
                  <span class="black--text">{{ item.address }}</span>
                </address>
              </template>
              <template v-slot:item.emails="{ item }">
                  {{ email.address }}
              </template>
              <template v-slot:item.phones="{ item }">
                  {{ phone.number }}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  icon
                  small
                  @click="openRemovePersonDlg(item)"
                ></v-btn>
                <v-icon
                    color="grey"
                    class="mdi mdi-trash-can-outline"
                ></v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <!------------------ dialog box to add person--------------------------->
        <v-dialog v-model="add_person_dlg" max-width="600px">
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
                        v-model="add_person.firstname"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-text-field
                        label="Last Name"
                        required
                        v-model="add_person.lastname"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="6"> </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Street Number"
                        v-model="add_person.street_number"
                        :rules="streetNumberRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Street Name"
                        v-model="add_person.street_name"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3" sm="6" md="4">
                      <v-text-field
                        label="City"
                        v-model="add_person.city"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-select
                        label="State"
                        v-model="add_person.state"
                        :rules="nameRules"
                        :items="states"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Zip"
                        v-model="add_person.zip"
                        :rules="zipRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="County"
                        v-model="add_person.county"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Primary Phone"
                        v-model="add_person.primaryPhone"
                        placeholder="(XXX) XXX-XXXX"
                        @keyup="formatPrimaryPhone"
                        :rules="phoneRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Secondary Phone"
                        placeholder="(XXX) XXX-XXXX"
                        v-model="add_person.secondaryPhone"
                        @keyup="formatSecondaryPhone"
                        :rules="phoneRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Primary Email"
                        v-model="add_person.primaryEmail"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Secondary Email"
                        v-model="add_person.secondaryEmail"
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
                  @click="add_person_dlg = false"
                >
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="addPerson" :disabled="!valid">
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <!--------------------- dialog box to add person closed-------------------->
      </v-col>
    </v-row>
    <!-------------------------------------Remove Person Dialog------------------------------>
    <v-dialog
        content-class="small-dlg"
        v-model="remove_person_dlg"
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
                @click="remove_person_dlg=false"
                style="background-color: #0091CD; color: white"
                depressed
            >
              No
            </v-btn>
            <v-btn
                @click="deleteContact"
                style="background-color: #7F181B; color: white"
                depressed
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!-------------------------------------//Remove Person Dialog------------------------------>

  </v-container>
</template>

<script>
import ContactDataService from "@/services/ContactDataService";
import EmailDataService from "../services/EmailDataService";
import PhoneDataService from "../services/PhoneDataService";
//activity log addition
import UserDataService from "../services/UserDataService";
// import ActivityLogDataService from "../services/ActivityLogDataService";
//close activity log addition

export default {
  name: "volunteers-list",
  //components: {AddVolunteer},
  data() {
    return {
      current_person_id: '',
      remove_person_dlg: false,
      volunteers: [],
      add_person_dlg: false,
      phone1:'',
      phone2:'',
      currentVolunteer: null,
      search: "",
      currentIndex: -1,
      name: "",
      add_person: {
        firstname: "",
        lastname: "",
        street_number: "",
        street_name: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        organization: "",
        primaryPhone: "",
        secondaryPhone: "",
        primaryEmail: "",
        secondaryEmail: "",
      },
      view_person: {
        firstname: "",
        lastname: "",
        street_number: "",
        street_name: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        organization: "",
        primaryPhone: "",
        secondaryPhone: "",
        primaryEmail: "",
        secondaryEmail: "",
      },
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
      /*
        Zip integer streetNumberRules
        County String nameRules
        phone integer phoneRules
        email - emailRules

        */
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
  computed: {
    headers() {
      var headers = [
        { text: "Name", value: "name", width: "80px" , class: 'red--text text--darken-3'},
        { text: "Address", value: "address", width: "100px", class: 'red--text text--darken-3' },
        { text: "Email", value: "email", width: "80px", class: 'red--text text--darken-3' },
        { text: "Phone", value: "phone", width: "100px", class: 'red--text text--darken-3' },
        { text: "County", value: "county", width: "80px", class: 'red--text text--darken-3' },
        { text: "Organization", value: "organization_names", width: "80px", class: 'red--text text--darken-3' },

        //{text: 'Notes', value: 'notes', width: '160px'},
      ];

      //if(this.filters.partners){
      //  headers.push({text: "Services", value:'partner.services', width: '80px'});
      //}
      //if(this.filters.relationships){
      //  headers.push({text: "Status",value:'relationship.status', width: '80px'});
      //}
      return headers;
    },
  },
  methods: {
    nav(item) {
      // add dialog page to display the full info
      this.$router.push({ path: "contact/" + item.id });
      //   }
      // console.log(item.id+" is the ID(1)");
    },
    retrieveVolunteers() {
      // console.log(this.$session.getAll());
      ContactDataService.getAll()
        .then((response) => {
          // console.log(response.data);
          this.volunteers = response.data.filter((contact) => {
            return contact.user == null;
          });
          this.volunteers.forEach((volunteer) => {
            volunteer.address =
              volunteer.street_number +
              " " +
              volunteer.street_name +
              "\n" +
              volunteer.city +
              ", " +
              volunteer.state +
              " " +
              volunteer.zip;

            volunteer.name = volunteer.first_name + " " + volunteer.last_name;
            var emails = "";
            volunteer.emails.forEach((email) => {
              if (email.isPrimary == true) {
                emails += email.address + "\n";
              }
            });
            volunteer.email = emails;
            var phones = "";
            volunteer.phones.forEach((phone) => {
              if (phone.isPrimary == true) {
                phones += phone.number + "\n";
              }
            });
            //do the same for organizations that is done with phones
            var organization_names = "";
            volunteer.organizations.forEach((organization) => {
              organization_names += organization.name + "\n";
            });
            volunteer.email = emails;
            volunteer.organization_names = organization_names;
            volunteer.phone = phones;
          });
          // console.log(this.volunteers);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },

    refreshList() {
      this.retrieveVolunteers();
      this.currentVolunteers = null;
      this.currentIndex = -1;
    },

    setActiveVolunteer(volunteer, index) {
      this.currentVolunteer = volunteer;
      this.currentIndex = index;
    },

    // removeAllVolunteers() {
    //   ContactDataService.deleteAll()
    //     .then((response) => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    searchTitle() {
      ContactDataService.findByName(this.first_name)
        .then((response) => {
          this.volunteers = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addPerson() {
      var data = {
        first_name: this.add_person.firstname,
        last_name: this.add_person.lastname,
        street_number: this.add_person.street_number,
        street_name: this.add_person.street_name,
        city: this.add_person.city,
        state: this.add_person.state,
        zip: this.add_person.zip,
        county: this.add_person.county,
      };
      data.services = this.add_person.services;
      ContactDataService.create(data).
      then(response=>{
        console.log(response);

        //activity log addition
        var logname = data.first_name +" "+data.last_name;
        //action variable depends on which method the call is made from
        var action = "created";
        this.addToLog(logname, action);
        // close activity log addition

        this.retrieveVolunteers();
        this.add_organization_dlg = false;
        return response.data.id;
      }).then(id=>{
        var email = {
          personId: id,
          address: this.add_person.primaryEmail,
          isPrimary: true
        };
        var email2 = {
          personId: id,
          address: this.add_person.secondaryEmail,
          isPrimary: false
        };
        var phone = {
          personId: id,
          number: this.add_person.primaryPhone,
          isPrimary: true
        };
        var phone2 = {
          personId: id,
          number: this.add_person.secondaryPhone,
          isPrimary: false
        }
        EmailDataService.create(email);
        EmailDataService.create(email2);
        PhoneDataService.create(phone);
        PhoneDataService.create(phone2);
        this.retrieveVolunteers();
      })
      .catch(e=>{
        console.log(e);
      });

      // this.addEmail(email1, data);
      // EmailDataService.create(email1).
      // then(response=>{
      //   console.log(response);
      //   this.retrieveVolunteers();
      //   this.add_organization_dlg = false
      // })
      // .catch(e=>{
      //   console.log(e);
      // });
      this.add_person_dlg = false;
      this.refreshList();
      // console.log("hit");
    },
    openRemovePersonDlg(item){
        this.remove_person_dlg = true;
        this.current_person_id = item.id;
    },
    deleteContact(){
      ContactDataService.delete(this.current_person_id)
          .then((response) => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    removePerson(item) {
      if (
        confirm(
          "Are you sure you want to remove " +name+" from the table?"
        )
      ) {
        ContactDataService.delete(item.id)
          .then((response) => {
            console.log(response);
            //activity log addition
            var action = "deleted";
            var name = item.first_name+" "+item.last_name;
            this.addToLog(name, action);
            //close activity log addition

            // console.log(response.data);
            // window.location.href = "/contacts";
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.refreshList();
    },
    //activity log addition
    //method to add a record to the activity log, takes input name of the item being manipulated
    addToLog(item, action) {
      var data = {
        entry: ""
      };
      var username;
      UserDataService.getByUserId(this.$session.get("userID"))
        .then((response) => {
          // console.log(response);
          username = response.data.person.first_name+" "+response.data.person.last_name;
          data.entry = item+" was "+action+" by "+username;
          console.log(data.entry);

          //TODO uncomment to keep workin on activity log
          // ActivityLogDataService.create(data).
          // then((response) => {
          //   console.log(response);
          // })
          // .catch((e) => {
          //   console.log(e.message);
          // });
        })
        .catch((e) => {
          console.log(e.message);
        });
      //todo: add backend functionality to store string in database
    },
  
    //format phone number as it is entered
    formatPrimaryPhone() {
      this.add_person.primaryPhone = this.add_person.primaryPhone.replace(/[^0-9]/g, '')
        .replace(/^(\d{3})?(\d{3})?(\d{4})?/g, '($1)$2-$3')
        .substr(0,13);
    },
    formatSecondaryPhone() {
      this.add_person.secondaryPhone = this.add_person.secondaryPhone.replace(/[^0-9]/g, '')
        .replace(/^(\d{3})?(\d{3})?(\d{4})?/g, '($1)$2-$3')
        .substr(0,13);
    },
  },

  mounted() {
    this.retrieveVolunteers();
  },
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.button {
  color: grey;
}
.input {
  border: 5px;
}
</style>