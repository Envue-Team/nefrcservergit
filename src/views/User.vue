<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div align="center" class="red--text text--darken-4 page-title">
          User Info
        </div>
      </v-col>
    </v-row>
    <v-row
      ><!---------------------First Container Row-------------------------------->
      <v-col class="col-7"
        ><!----------------------Left Column-------------------------->
        <!---------------------Contact Basic Data-------------------------------->
        <v-row>
          <v-col class="offset-1 col-10">
            <v-card elevation="3">
              <v-card-title>
                <v-row>
                  <v-col>
                    <span class="text-h4 font-weight-thin">
                      {{ edit_person.first_name + " " + edit_person.last_name }}
                    </span>
                    <v-row>
                      <span class="text-h6 font-weight-thin">
                        {{ "Roles: " + view_role.role }}
                      </span>
                    </v-row>
                  </v-col>
                  <v-col class="col-2">
                    <!---------------------------------Edit Contact Dialog------------------------------->
                    <v-dialog v-model="edit_person_dlg" max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-hover v-slot="{ hover }" open-delay="200">
                          <v-btn
                            icon
                            :elevation="hover ? 16 : 2"
                            :class="{ 'on-hover': hover }"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon> mdi-pencil </v-icon>
                          </v-btn>
                        </v-hover>
                      </template>
                      <v-card>
                        <v-form v-model="valid" lazy-validation>
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
                                <v-col cols="6">
                                  <v-text-field
                                    label="Email"
                                    v-model="edit_user.email"
                                    :rules="emailRules"
                                  ></v-text-field>
                                </v-col>
                                <!-- <v-col cols="6">
                                  <v-text-field
                                    label="Password"
                                    type="password"
                                    v-model="edit_user.password"
                                  ></v-text-field>
                                </v-col> -->
                              </v-row>
                              <v-row>
                                <v-row>
                                  <v-col cols="6">
                                    <v-autocomplete
                                      label="User Role"
                                      v-model="view_role.role"
                                      :items="role"
                                      item-text="name"
                                      item-value="id"
                                    >
                                      {{ view_role.role }}
                                    </v-autocomplete>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                        label="Phone"
                                        v-model="edit_contact.phone"
                                        :rules="phoneRules"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
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
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserDataService from "../services/UserDataService";
import RoleDataService from "../services/RoleDataService";
import UserRoleDataService from "../services/UserRoleDataService";
import EmailDataService from "@/services/EmailDataService";
import PhoneDataService from "@/services/PhoneDataService";
const crypto = require('crypto');

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
        // password: "",
        email: "",
      },
      edit_role: {
        role: "",
        userId: "",
      },
      view_role: {
        role: "",
      },
      edit_contact: {
        phone: "",
      },
      contact_id: {
        phone: "",
        email: "",
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
  methods: {
    updateSelectedRole(role) {
      let updatedRoleId = '';
      let currentRole = '';
      if(role === "User") {
        updatedRoleId = 2;
        currentRole = 1;
      } else {updatedRoleId = 1;
      currentRole = 2;}
      var data = {
        userId: this.edit_role.userId,
        roleId: currentRole
      }
      var currentDataRole = {
        roleId: updatedRoleId
      }
      UserRoleDataService.update(data.userId, data.roleId, currentDataRole)
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
          this.edit_contact.phone = response.data.phones[0].number;

          this.contact_id.phone = response.data.phones[0].id;
          this.contact_id.email = response.data.emails[0].id;

          if(userRole == 2) {
            this.view_role.role = "User";
          } else {this.view_role.role = "Admin"}
        })
        .catch((e) => {
          console.log(e);
        });
    },
  generateSalt() {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword(plainText, salt) {
      return crypto
          .createHash('sha256')
          .update(plainText)
          .update(salt)
          .digest('hex')
    },
    updatePerson() {

      // let salt = this.generateSalt();
      // let password = this.encryptPassword(this.edit_user.password, salt)

      var data = {
        first_name: this.edit_person.first_name,
        last_name: this.edit_person.last_name,
        email: this.edit_user.email,
        // password: password,
        // salt: salt
      };
      console.log(data);
      var personID = this.$route.params.personId;
      //data.services = this.add_person.services;

      var updatePhone = {
        number: this.edit_contact.phone,
        isPrimary: true
      }
      var updateEmail = {
        address: this.edit_user.email,
        isPrimary: true
      }

      PhoneDataService.update( this.contact_id.phone, updatePhone);
      EmailDataService.update(this.contact_id.email, updateEmail);

      UserDataService.update(personID, data)
        .then((response) => {
          // console.log(response);
          //this.retrieveVolunteers();
          console.log(response);
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
