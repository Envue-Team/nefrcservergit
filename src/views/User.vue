<template>
<!-- Starts Here -->
  <!-- <div class="list row">
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
      <h4>Users</h4>
      <v-data-table
        :headers="headers"
        :items="volunteers"
        :search="search"
        item-key="id"
        multi-sort
      >
        <template v-slot:item.name="{ item }">
          <template v-if="item.first_name !== null">
            <button v-on:click="removePerson(item)">X</button>
            <a v-on:click="nav(item)">
              <span class="black--text">{{ item.name }}</span>
              <span v-if="item.public_safety"> (Public Safety)</span></a
            >
          </template>
          <template v-else-if="item.partner !== null">
            <a v-on:click="nav(item)">
              <span class="purple--text">{{ item.name }}</span>
              <span v-if="item.public_safety"> (Public Safety)</span></a
            >
          </template>
        </template>
        <template v-slot:item.address="{ item }">
          <address>
            {{ item.address }}
          </address>
        </template>
        <template v-slot:item.email="{ item }">
          <a v-on:click="nav(item)">
            <div>
              <span class="black--text">
                {{ item.user.email }}
              </span>
            </div>
          </a>
        </template>
        <template v-slot:item.roles="{ item }">
          <div>
            <span class="purple--text">{{ item.role }}</span>
          </div>
        </template> -->
        <!-- <template v-slot:item.manager ="{ item }">
            {{ item.manager }}

          </template> -->
      <!-- </v-data-table> -->
      <!------------------ dialog box to add person--------------------------->
      <!-- <v-dialog v-model="add_person_dlg" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-btn
              text
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              v-bind="attrs"
              v-on="on"
            >
              Add User
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-hover>
        </template>
        <v-card>
          <v-form>
            <v-card-title>
              <span class="headline">Add User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <v-text-field
                      label="First Name"
                      required
                      v-model="add_person.firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-text-field
                      label="Last Name"
                      required
                      v-model="add_person.lastname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="6"> </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Email"
                      v-model="add_person.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Password"
                      v-model="add_person.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="add_person_dlg = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="addPerson">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog> -->
      <!--------------------- dialog box to add person closed-------------------->

      <!-- <br /> -->

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
        Remove All
      </button> -->
      <!-- <br />
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
          <label><strong>Description:</strong></label>
          {{ currentVolunteer.description }} -->
<!-- Ends here -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="red--text text--darken-4 page-title">User Information</div>
      </v-col>
    </v-row>
    <v-row
      ><!---------------------First Container Row-------------------------------->
      <v-col class="col-7"
        ><!----------------------Left Column-------------------------->
        <!---------------------Partner Basic Data-------------------------------->
        <div class="text-h5 font-weight-thin"></div>
        <div class="text-h3 font-weight-thin">
          {{ person.name }}
          <!---------------------------------Edit Relationship Dialog------------------------------->
          <v-dialog v-model="edit_person_dlg" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-btn
                  text
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                  v-bind="attrs"
                  @click="showDialog"
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </v-hover>
            </template>
            <v-card>
              <v-form>
                <v-card-title>
                  <span class="headline">User Information</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          label="First Name"
                          required
                          v-model="edit_person.first_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          label="Last Name"
                          required
                          v-model="edit_person.last_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="6"> </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="Email"
                          v-model="edit_user.email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Password"
                          v-model="edit_user.password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-autocomplete
                          label="User Role"
                          :items="roles"
                          item-text="name"
                          item-value="id"
                          return-object
                          @change="updateSelectedRole"
                        >
                        </v-autocomplete>
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
                  <v-btn color="blue darken-1" text @click="updatePerson">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
        <div class="body-3 mt-3">
          Name:
          {{ edit_person.first_name + " " + edit_person.last_name }}
        </div>
        <div class="body-3 mt-3">Email: {{ edit_user.email }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

// import PersonDataService from "../services/PersonDataService";
// import UserDataService from "../services/UserDataService";
// import UserRoleDataService from "../services/UserRoleDataService";

import UserDataService from "../services/UserDataService";
import RoleDataService from "../services/RoleDataService";

export default {
  name: "user",
  data() {
    return {

      // volunteers: [],
      // add_person_dlg: false,
      // currentVolunteer: null,
      // search: "",
      // currentIndex: -1,
      // name: "",
      // role: "",
      // add_person: {
      //   firstname: "",
      //   lastname: "",
      //   email: "",
      //   password: "",
      // },
      // add_role: {
      //   roles: "",
      // },
      // view_person: {
      //   firstname: "",
      //   lastname: "",

      selectedRole: '',
      roles: [],
      edit_person_dlg: false,
      person: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      edit_person: {
        first_name: "",
        last_name: "",
      },
      edit_user: {
        password: "",
        email: "",
      },
    };
  },
  methods: {
    updateSelectedRole(obj) {
        this.selectedRole = obj;
    },
    populateRoles() {
      RoleDataService.getAll()
        .then((response) => {

          // // if(roleNumber = 2) {
          // //   roleName = "User";
          // // } else {roleName = "Admin";}

          // console.log(response.data);
          // this.volunteers = response.data;
          // this.volunteers.forEach((volunteer) => {

          //   volunteer.name = volunteer.first_name + " " + volunteer.last_name;

          //   console.log(volunteer.user.roles[0].user_roles.roleId);

          //   let roleNumber = volunteer.user.roles[0].user_roles.roleId;
          //   let roleName = "";

          //   if(roleNumber == 2) {
          //     roleName = "User"
          //     } else {
          //       roleName = "Admin"
          //     }

          //   volunteer.role = roleName
          // });
          // // console.log(this.volunteers);
          this.roles = response.data;
          console.log(this.roles);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDialog() {
      this.edit_person_dlg = true;
    },
    setPerson() {
      this.populateRoles();
      UserDataService.get(this.$route.params.personId)
        .then((response) => {
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
          console.log(response.data);
          this.edit_person = response.data;
          this.edit_user = response.data.user;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
// <<<<<<< HEAD
//     addPerson() {
// =======
    updatePerson() {
      var data = {
        first_name: this.edit_person.first_name,
        last_name: this.edit_person.last_name,
        email: this.edit_user.email,
        password: this.edit_user.password,
      };
// <<<<<<< HEAD
//       var userData = {
//         roles: this.add_role.roles,
//       };

//       data.services = this.add_person.services;
//       UserDataService.create(data)
//         .then((response) => {
//           console.log(response);
//           let data = {
//             roleId: 2,
//             userId: response.data,
//           };
          
//           UserRoleDataService.create(data)
//             .then((resp) => {
//               this.refreshList();
//             })
//             .catch((err) => {
//               console.log(err);
//             });
// =======
      console.log(data);
      var personID = this.$route.params.personId;
      //data.services = this.add_person.services;
      UserDataService.update(personID, data)
        .then((response) => {
          // console.log(response);
          //this.retrieveVolunteers();
          return response.data.id;
        })
        .then((id) => {
          console.log(id);
        })
        .catch((e) => {
          console.log(e);
        });
// <<<<<<< HEAD
//       this.add_person_dlg = false;
//     },

//     removePerson(item) {
//       if (
//         confirm(
//           "Are you sure you want to remove " +
//             item.first_name +
//             " " +
//             item.last_name +
//             " from the table?"
//         )
//       ) {
//         UserDataService.delete(item.id)
//           .then((response) => {
//             this.refreshList();
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//       }
// =======
      this.edit_person_dlg = false;
    },
  },
  mounted() {
    this.setPerson();
  },
};
</script>
            
        