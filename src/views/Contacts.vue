<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Contacts Table</h4>
      <v-data-table
            :headers="headers"
            :items="volunteers"
            @click:row="nav"
            item-key="id"
            multi-sort
            >
            <template v-slot:item.name="{ item }">
              <template v-if="item.first_name !== null">
                <span class="red--text">{{ item.first_name+" "+item.last_name }}</span>
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
                {{ item.street_number }} {{ item.street_name}}<br>
                {{ item.city }}, {{ item.state }} {{ item.zip }}
              </address>
          </template>
          <template v-slot:item.manager ="{ item }">
            {{ item.manager }}

          </template>
        </v-data-table>
        <!-- dialog box to add person-->
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
            <v-col cols="6">
              <v-text-field
              label="County"
              v-model="add_person.county"
              ></v-text-field>
            </v-col>
            
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
        <!-- dialog box to add person-->
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
        Remove All
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
export default {
  name: "volunteers-list",
  //components: {AddVolunteer},
  data() {
    return {
      volunteers: [],
      add_person_dlg: false,
      currentVolunteer: null,
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
      }
    };
  },
  computed: {
      headers () {
        var headers = [
          {text: 'Name',value: 'name', width: '80px'},
          {text: 'Address', value: 'address', width: '100px'},
          {text: 'Email', value: 'email', width: '80px'},
          {text: 'Phone', value: 'primaryPhone', width: '100px' },
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
        if(item.partner !== null){
          this.$router.push({ path: "partner/"+item.id});
        }else if(item.relationship != null){
          this.$router.push({ path: "relationship/"+item.id});
        }
      },
    retrieveVolunteers() {
      PersonDataService.getAll()
        .then(response => {
          this.volunteers = response.data;
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
      PersonDataService.findByName(this.name)
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
            "firstname": this.add_person.firstname,
            "lastname": this.add_person.lastname,
            "street_number": this.add_person.street_number,
            "street_name": this.add_person.street_name,
            "city": this.add_person.city,
            "state":this.add_person.state,
            "zip":this.add_person.zip,
            "county":this.add_person.county
          };
          data.services = this.add_person.services;
          PersonDataService.create(data).
          then(response=>{
            console.log(response);
            this.retrieveOrganizations();
            this.add_organization_dlg = false
          })
          .catch(e=>{
            console.log(e);
          });
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