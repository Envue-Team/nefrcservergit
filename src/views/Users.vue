<template>
  <v-container>
    <div class="red--text text--darken-4 page-title">Users</div>
    <v-row>

      <v-col class="col-12">
        <v-card elevation="3 text-wrap">
          <v-card-text>
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Table"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        <v-data-table
          :headers="headers"
          :items="volunteers"
          :search="search"
          item-key="id"
          multi-sort
          class="text-capitalize"
        >
          <template v-slot:item.name="{ item }">
            <button v-on:click="removePerson(item)">X</button>
            <template v-if="item.first_name !== null">
              <a v-on:click="nav(item)">
              <span class="black--text">  {{ item.name }}</span>
              <span v-if="item.public_safety"> (Public Safety)</span></a>
            </template>
            <template v-else-if="item.partner !== null">
              <a v-on:click="nav(item)">
              <span class="purple--text">{{ item.name }}</span>
              <span v-if="item.public_safety"> (Public Safety)</span></a>
            </template>
          </template>
          <template v-slot:item.address="{ item }">
            <address>
              {{ item.address }}
            </address>
          </template>
          <template v-slot:item.email="{ item }">
            <a v-on:click="nav(item)">
            <div><span class="black--text">
              {{ item.user.email }}
            </span></div> </a>
              </template>
              <template v-slot:item.roles="{ item }">
                <div>
                  <span class="purple--text">{{ item.role }}</span>
                </div>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="removePerson(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
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

        <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
          Remove All
        </button> -->
        <!--      </v-col>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonDataService from "../services/PersonDataService";
import UserDataService from "../services/UserDataService";
import UserRoleDataService from "../services/UserRoleDataService";

export default {
  name: "users",
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
      return headers;
    },
  },
  methods: {
    nav(item) {
      // add dialog page to display the full info
      this.$router.push({ path: "User/" + item.id });
      //   }
      // console.log(item.id+" is the ID(1)");
    },
    retrieveVolunteers() {
      UserDataService.getAll()
          .then((response) => {
            console.log(response.data);
            this.volunteers = response.data;
            this.volunteers.forEach((volunteer) => {

              volunteer.name = volunteer.first_name + " " + volunteer.last_name;
              console.log(volunteer.name);
              //TODO: Review this
              // let roleNumber = volunteer.user.roles[0].user_roles.roleId;
              // let roleName = "";
              //
              // if(roleNumber == 2) {
              //   roleName = "User"
              // } else {
              //   roleName = "Admin"
              // }
              //
              // volunteer.role = roleName
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

            this.refreshList();
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
