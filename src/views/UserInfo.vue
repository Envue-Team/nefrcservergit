<template>
  <v-container>
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
                          v-model="view_role.role"
                          :items="role"
                          item-text="name"
                          item-value="id"
                        > {{ view_role.role }}
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
        <div class="body-3 mt-3">Role: {{ view_role.role }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserDataService from "../services/UserDataService";
import RoleDataService from "../services/RoleDataService";
import UserRoleDataService from "../services/UserRoleDataService";

export default {
  data() {
    return {
      selectedRole: '',
      role: ['Admin', 'User'],
      edit_person_dlg: false,
      person: {
        first_name: "",
        last_name: "",

      },
      edit_person: {
        first_name: "",
        last_name: "",
      },
      edit_user: {
        password: "",
        email: "",
      },
      edit_role: {
        role: "",
        userId: "",
      },
      view_role: {
        role: "",
      }
    };
  },
  methods: {
    updateSelectedRole(role) {
      let updatedRoleId = '';

      if(role === "User") {
        updatedRoleId = 2;
      } else {updatedRoleId = 1;}

      var data = {
        userId: this.edit_role.userId,
        roleId: updatedRoleId
      }

      UserRoleDataService.update(data.userId, data)
      .then((response)=> {
        console.log(response);
      })
      .catch((e)=> {
        console.log(e);
      })
    },
    populateRoles() {
      RoleDataService.getAll()
        .then((response) => {
          this.roles = response.data;
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
          console.log(response);
          let userRole = response.data.user.roles[0].user_roles.roleId
          console.log(response.data.user.id);
          console.log(userRole);
          this.edit_role.userId = response.data.user.id;
          this.edit_person = response.data;
          this.edit_user = response.data.user;

          if(userRole == 2) {
            this.view_role.role = "User";
          } else {this.view_role.role = "Admin"}
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePerson() {
      var data = {
        first_name: this.edit_person.first_name,
        last_name: this.edit_person.last_name,
        email: this.edit_user.email,
        password: this.edit_user.password,
      };
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
      this.edit_person_dlg = false;

      console.log(this.view_role.role);
      this.updateSelectedRole(this.view_role.role)
    },
  },
  mounted() {
    this.setPerson();
  },
};
</script>
            
        