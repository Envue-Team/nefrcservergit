<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <v-row>
          <v-col class="col-3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Table"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>        
      </div>
    </div>
    <div class="col-md-12">
      <h4>Contacts Table</h4>
      <v-data-table
        :headers="headers"
        :items="volunteers"
        :search="search"
        item-key="id"
        @click:row="nav"
        multi-sort
      >
      <template v-slot:item.name="{ item }">
        <template v-if="item.first_name !== null">
          <button v-on:click="removePerson(item)">X</button>
          <span class="red--text">{{ item.name }}</span>
          <span v-if="item.public_safety"> (Public Safety)</span>
        </template>
        <template v-else-if="item.partner!==null">
          <span class="purple--text">{{ item.name }}</span>
          <span v-if="item.public_safety"> (Public Safety)</span> 
        </template>
      </template>
      <template
        v-slot:item.address="{ item }"
      >
        <address>
          {{ item.address }}
        </address>              
      </template>
      <template
        v-slot:item.emails="{ item }"
      >
        <div>   
          {{ email.address }}     
        </div>         
      </template>
      <template
          v-slot:item.phones="{ item }"
      >
        <div >       
          {{phone.number}}  
        </div>         
      </template>
          <!-- <template v-slot:item.manager ="{ item }">
            {{ item.manager }}

          </template> -->
    </v-data-table>
        <!------------------ dialog box to add person--------------------------->
      <v-dialog
        v-model="add_person_dlg"
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-hover
          v-slot="{ hover }"
          open-delay="200"
        >
        <v-btn
          text
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          v-bind="attrs"
          v-on="on"
        >
        Add Contact
        <v-icon>
          mdi-plus
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
                v-model="add_person.firstname"
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
                  v-model="add_person.lastname"
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
                v-model="add_person.street_number"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Street Name"
                v-model="add_person.street_name"
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
                  v-model="add_person.city"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="State"
                  v-model="add_person.state"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Zip"
                  v-model="add_person.zip"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="County"
                  v-model="add_person.county"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Primary Phone"
                  v-model="add_person.primaryPhone"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Secondary Phone"
                  v-model="add_person.secondaryPhone"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Primary Email"
                  v-model="add_person.primaryEmail"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Secondary Email"
                  v-model="add_person.secondaryEmail"
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
            @click="add_person_dlg=false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addPerson"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
        <!--------------------- dialog box to add person closed-------------------->

      <br>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
        Remove All
      </button> -->
      <br>
      <button class="m-3 btn btn-sm btn-danger" @click="refreshList">
        Refresh List
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentVolunteer">
        <h4>Volunteer</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentVolunteer.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentVolunteer.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentVolunteer.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/Volunteers/' + currentVolunteer.id"
        >
          Edit
        </a>
        <p>hit3</p>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Volunteer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PersonDataService from "../services/PersonDataService";
// import PhoneDataService from "../services/PhoneDataService";
import EmailDataService from "../services/EmailDataService";
import PhoneDataService from '../services/PhoneDataService';

export default {
  name: "volunteers-list",
  //components: {AddVolunteer},
  data() {
    return {
      volunteers: [],
      add_person_dlg: false,
      currentVolunteer: null,
      search: '',
      currentIndex: -1,
      name: "",
      add_person: {
        firstname: '',
        lastname:'',
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
      view_person: {
        firstname: '',
        lastname:'',
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
      }
    };
  },
  computed: {
      headers () {
        var headers = [
          {text: 'Name',value: 'name', width: '80px'},
          {text: 'Address', value: 'address', width: '100px'},
          {text: 'Email', value: 'email', width: '80px'},
          {text: 'Phone', value: 'phone', width: '100px' },
          {text: 'County', value: 'county', width: '80px'},
          {text: 'ZIP', value: 'zip', width: '80px'},

          //{text: 'Notes', value: 'notes', width: '160px'},

        ]

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
      nav(item){
        // add dialog page to display the full info 
        this.$router.push({ path: "ContactInfo/"+item.id});
      //   }
      // console.log(item.id+" is the ID(1)");
      },
    retrieveVolunteers() {
      PersonDataService.getAll()
        .then(response => {
          this.volunteers = response.data;
          this.volunteers.forEach(volunteer=>{
            console.log("running");
          
            volunteer.address = volunteer.street_number+" "+volunteer.street_name+"\n"
            +volunteer.city+", "+volunteer.state+" "+volunteer.zip;

            volunteer.name = volunteer.first_name+" "+volunteer.last_name;
            var emails = '';
            volunteer.emails.forEach(email=>{
              if(email.isPrimary == true){
                emails += email.address+"\n";
              }
            });
            volunteer.email = emails;
            var phones = '';
            volunteer.phones.forEach(phone=>{
              if(phone.isPrimary == true){
                phones += phone.number+"\n";
              } 
            });
            volunteer.phone = phones;
          });
          // console.log(this.volunteers);
        })
        .catch(e => {
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

    removeAllVolunteers() {
      PersonDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      PersonDataService.findByName(this.first_name)
        .then(response => {
          this.volunteers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    addPerson(){
      var data = {
        "first_name": this.add_person.firstname,
        "last_name": this.add_person.lastname,
        "street_number": this.add_person.street_number,
        "street_name": this.add_person.street_name,
        "city": this.add_person.city,
        "state":this.add_person.state,
        "zip":this.add_person.zip,
        "county":this.add_person.county,
      };
      // var email1 = {
      //   "address": this.add_person.primaryEmail,
      //   // "personId": 
      // }
      // var phone = {
      //   person.id,
      //   this.add_person.primaryPhone,
      // };
      data.services = this.add_person.services;
      PersonDataService.create(data).
      then(response=>{
        // console.log(response);
        this.retrieveVolunteers();
        this.add_organization_dlg = false;
        return response.data.id;
      }).then(id=>{
        console.log(id);
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

      this.refreshVolunteers();
    },
    removePerson(item) {
      if(confirm("Are you sure you want to remove "+item.first_name+" "+item.last_name+" from the table?")){
        PersonDataService.delete(item.id)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.retrieveVolunteers();
  }
};
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