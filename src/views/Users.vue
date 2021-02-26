<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <span class="mobile-title hidden-md-and-up">Users</span>
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
            <v-toolbar-title class="card-header-title">Users</v-toolbar-title>
          </v-card>
          <v-card-text>
            <v-row>
              <v-btn
                  fab
                  elevation="3"
                  small
                  class="ml-3"
                  color="white"
                  @click="add_person_dlg=true"
              >
                <v-icon class="mdi mdi-dark mdi-plus">
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                  class="shrink mt-3 mr-3"
                  label="Search"
                  v-model="search"
                  append-icon="mdi-magnify"
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
                <div v-if="item.first_name !== null">
                  <span class="black--text"> {{ item.name }}</span>
                </div>
              </template>
              <template v-slot:item.address="{ item }">
                <address>
                  {{ item.address }}
                </address>
              </template>
              <template v-slot:item.email="{ item }">
                  <span class="black--text">
                    {{ item.user.email }}
                  </span>
              </template>
              <template v-slot:item.role="{ item }">
                <div v-if="item.roles !== null">
                <span class="black--text">{{ item.role }}</span>
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
          <v-card>
            <v-form v-model="valid" lazy-validation>
              <v-card-title>
                <span class="headline">Add User</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-text-field
                          required
                          label="First Name"
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
                    <v-col cols="6">
                      <v-text-field
                          label="Email"
                          v-model="add_person.email"
                          :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                          label="Password"
                          v-model="add_person.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                          label="Phone"
                          v-model="add_person.phone"
                          :rules="phoneRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- make an input field for roles -->

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

        <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
          Remove All
        </button> -->
        <!--      </v-col>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDataService from "../services/UserDataService";
import UserRoleDataService from "../services/UserRoleDataService";
import PhoneDataService from "@/services/PhoneDataService";
import EmailDataService from "@/services/EmailDataService";
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
      roles: "",
      add_person: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
      },
      add_role: {
        roles: "",
      },
      view_person: {
        firstname: "",
        lastname: "",
      },
      nameRules: [
        v => !!v || "Required",
        v => /\D\S$/.test(v) || "No white or empty spaces",
      ],
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        v => !!v || "Required",
        v => /\S\d$/.test(v) || "Phone number must be valid",
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
        { text: "Name", value: "name", width: "80px", class: 'red--text text--darken-3' },
        { text: "Email", value: "email", width: "80px", class: 'red--text text--darken-3' },
        { text: "Roles", value: "role", width: "100px", class: 'red--text text--darken-3' },
      ];
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
            console.log(response);
            this.volunteers = response.data;
            console.log(response.data);
            this.volunteers.forEach((volunteer) => {
              volunteer.name = volunteer.first_name + " " + volunteer.last_name;
              volunteer.role = volunteer.user.roles[0].name;
            });
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
          let data = {
            userId: response.data.userId,
            roleId: 2,
          };

          let phoneData = {
            personId: response.data.personId,
            number: this.add_person.phone,
            isPrimary: true,
          };
          let emailData = {
            personId: response.data.personId,
            address: this.add_person.email,
            isPrimary: true,
          };

          PhoneDataService.create(phoneData);
          EmailDataService.create(emailData);
          UserRoleDataService.create(data)
            .then((resp) => {
              this.refreshList();
            })
            .catch((err) => {
              console.log(err);
            });

          this.refreshList();
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
            let data = {
              userId: response.data.userId,
              roleId: 2,
            };
            let phoneData = {
              personId: response.data.personId,
              number: this.add_person.phone,
              isPrimary: true,
            };
            let emailData = {
              personId: response.data.personId,
              address: this.add_person.email,
              isPrimary: true,
            };
            PhoneDataService.create(phoneData);
            EmailDataService.create(emailData);
            UserRoleDataService.create(data)
                .then((resp) => {
                  this.refreshList();
                })
                .catch((err) => {
                  console.log(err);
                });
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      this.add_person_dlg = false;
    }
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