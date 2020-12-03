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
        </template>
        <!-- <template v-slot:item.manager ="{ item }">
            {{ item.manager }}

          </template> -->
      </v-data-table>
      <!------------------ dialog box to add person--------------------------->
      <v-dialog v-model="add_person_dlg" max-width="600px">
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
      </v-dialog>
      <!--------------------- dialog box to add person closed-------------------->

      <br />

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
        Remove All
      </button> -->
      <br />
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
          {{ currentVolunteer.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentVolunteer.published ? "Published" : "Pending" }}
        </div>

        <a
          class="badge badge-warning"
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
import UserDataService from "../services/UserDataService";
import UserRoleDataService from "../services/UserRoleDataService";

export default {
  name: "volunteer-list",
  data() {
    return {
      volunteers: [],
      add_person_dlg: false,
      currentVolunteer: null,
      search: "",
      currentIndex: -1,
      name: "",
      role: "",
      add_person: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      add_role: {
        roles: "",
      },
      view_person: {
        firstname: "",
        lastname: "",
      },
    };
  },
  computed: {
    headers() {
      var headers = [
        { text: "Name", value: "name", width: "80px" },
        { text: "Email", value: "email", width: "80px" },
        { text: "Roles", value: "role", width: "100px" },

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
      this.$router.push({ path: "UserInfo/" + item.id });
      //   }
      // console.log(item.id+" is the ID(1)");
    },
    retrieveVolunteers() {
      UserDataService.getAll()
        .then((response) => {

          // if(roleNumber = 2) {
          //   roleName = "User";
          // } else {roleName = "Admin";}

          console.log(response.data);
          this.volunteers = response.data;
          this.volunteers.forEach((volunteer) => {

            volunteer.name = volunteer.first_name + " " + volunteer.last_name;

            console.log(volunteer.user.roles[0].user_roles.roleId);

            let roleNumber = volunteer.user.roles[0].user_roles.roleId;
            let roleName = "";

            if(roleNumber == 2) {
              roleName = "User"
              } else {
                roleName = "Admin"
              }

            volunteer.role = roleName
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
    addPerson() {
      var data = {
        first_name: this.add_person.firstname,
        last_name: this.add_person.lastname,
        email: this.add_person.email,
        password: this.add_person.password,
      };
      var userData = {
        roles: this.add_role.roles,
      };

      data.services = this.add_person.services;
      UserDataService.create(data)
        .then((response) => {
          console.log(response);
          let data = {
            roleId: 2,
            userId: response.data,
          };
          
          UserRoleDataService.create(data)
            .then((resp) => {
              this.refreshList();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          console.log(e);
        });
      this.add_person_dlg = false;
    },

    removePerson(item) {
      if (
        confirm(
          "Are you sure you want to remove " +
            item.first_name +
            " " +
            item.last_name +
            " from the table?"
        )
      ) {
        UserDataService.delete(item.id)
          .then((response) => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.retrieveVolunteers();
  },
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