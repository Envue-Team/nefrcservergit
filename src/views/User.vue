<template>
  <v-container>
    <v-row
      ><!---------------------First Container Row-------------------------------->
      <v-col class="col-md-5 col-sm-12"
        ><!----------------------Left Column-------------------------->
        <!---------------------Contact Basic Data-------------------------------->
            <v-card
                class="pa-1 mx-10 hidden-md-and-down"
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
                  <div
                      class="card-header-subtitle">
                    {{ view_role.role}}<br/>
                    {{ edit_person.emails[0].address }} | {{ edit_person.phones[0].number }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      small
                      @click="edit_user_password_dlg=true"
                  >
                    Change User Password
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
        <!--------------------------Small Screen------------------------------>
        <span class="hidden-md-and-up">
        <div
              style="font-weight: 700; color: #878686; font-size: 18px;"
          >
            {{ edit_person.first_name + " " + edit_person.last_name }}
            <v-btn
                outlined
                style="color: #878686; margin-left: 135px"
                class="ml-3"
                @click="edit_person_dlg=true"
            >
              <v-icon
                  small
                  class="mdi mdi-pencil"
              >
              </v-icon>
            </v-btn>
          </div>
        <div
            style="
              padding: 10px 20px;
              font-family: 'Poppins', sans-serif;
              color: #504b4b;
              font-size: 16px;
            "
        >
          {{ view_role.role }}<br/>
          {{ edit_person.emails[0].address }} | {{ edit_person.phones[0].number }}
          <v-btn
              class="mt-3"
              small
              @click="edit_user_password_dlg=true"
          >
            Change User Password
          </v-btn>
        </div>
          </span>
        <!--------------------------Small Screen------------------------------>
      </v-col>
    </v-row>

    <!-----------------------------------Edit User Password Dialog--------------------------------->
    <v-dialog
        v-model="edit_user_password_dlg"
        content-class="lg-dlg"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
        <v-card>
          <v-form v-model="valid">
            <v-card-title>
              <span class="dlg-title">Change User Password</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <div class="cols col-md-6 col-sm-12">
                    <v-text-field
                        label="New Password"
                        type="password"
                        hint="Password must be a minimum of 8 characters and have at least one letter and one number"
                        required
                        v-model="edit_user.password"
                        :rules="passwordRules"
                    ></v-text-field>
                    <v-text-field
                        label="Enter New Password Again"
                        type="password"
                        required
                        v-model="verify"
                        :rules="confirmationRules"
                    ></v-text-field>
                  </div>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  style="color: #0091CD"
                  text
                  @click="edit_user_password_dlg=false"
              >
                Cancel
              </v-btn>
              <v-btn
                  class="hidden-md-and-down"
                  style="background-color: #7F181B; color: white"
                  depressed
                  :disabled="!valid"
                  @click="openDialog('EditPassword')"
              >
                Save Changes
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-card>
    </v-dialog>
    <!-----------------------------------Edit User Password Dialog--------------------------------->

    <!-----------------------------------Verify Edit User Password Dialog--------------------------------->
    <v-dialog
        content-class="small-dlg"
        v-model="verify_edit_password_dialog"
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
            Are you sure you want to make this change?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="verify_edit_password_dialog=false"
                style="background-color: #0091CD; color: white"
                depressed
            >
              Cancel
            </v-btn>
            <v-btn
                @click="updatePassword"
                style="background-color: #7F181B; color: white"
                depressed
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!-----------------------------------Verify Edit User Password Dialog--------------------------------->

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
            <span class="dlg-title">User Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <div class="cols col-md-6 col-sm-12">
                  <v-text-field
                      label="First Name"
                      required
                      v-model="edit_person.first_name"
                      :rules="nameRules"
                  ></v-text-field>
                </div>
                <div class="cols col-md-6 col-sm-12">
                  <v-text-field
                      label="Last Name"
                      required
                      v-model="edit_person.last_name"
                      :rules="nameRules"
                  ></v-text-field>
                </div>
              </v-row>
              <v-row>
                <div class="cols col-md-6 col-sm-12">
                  <v-text-field
                      label="Email"
                      v-model="edit_user.email"
                      :rules="emailRules"
                  ></v-text-field>
                </div>
                <!-- <v-col cols="6">
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="edit_user.password"
                  ></v-text-field>
                </v-col> -->
              </v-row>
              <v-row>
                  <div class="cols col-md-6 col-sm-12">
                    <v-autocomplete
                        label="User Role"
                        :items="roles"
                        item-text="role"
                        v-model="edit_role.role"
                    >
                    </v-autocomplete>
                  </div>
                  <div class="cols col-md-6 col-sm-12">
                    <v-text-field
                        label="Phone"
                        v-model="edit_contact.phone"
                        :rules="phoneRules"
                    ></v-text-field>
                  </div>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
                style="background-color: #ED1B2E; color: white"
                depressed
                @click="openDialog('Delete')"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                style="color: #0091CD"
                text
                @click="edit_person_dlg=false"
            >
              Cancel
            </v-btn>
            <v-btn
                class="hidden-md-and-down"
                style="background-color: #7F181B; color: white"
                depressed
                :disabled="!valid"
                @click="openDialog('Update')"
            >
              Save Changes
            </v-btn>
            <v-btn
                class="hidden-md-and-up"
                style="background-color: #7F181B; color: white"
                depressed
                :disabled="!valid"
                @click="openDialog('Update')"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-card>
    </v-dialog>

    <!-----------------------------------Delete User Dialog--------------------------------->
    <v-dialog
        content-class="small-dlg"
        v-model="delete_user_dialog"
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
            Are you sure you want to delete this user?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="delete_user_dialog=false"
                style="background-color: #0091CD; color: white"
                depressed
            >
              No
            </v-btn>
            <v-btn
                @click="deleteUser"
                style="background-color: #7F181B; color: white"
                depressed
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!-----------------------------------Delete User Dialog--------------------------------->

    <!---------------------------------Save User Dialog------------------------------>
    <v-dialog
        v-model="update_user_dialog"
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
                @click="update_user_dialog=false"
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
    <!---------------------------------//Save User Dialog------------------------------>

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
      valid: false,
      verify: '',
      delete_user_dialog: false,
      update_user_dialog: false,
      edit_user_password_dlg: false,
      verify_edit_password_dialog: false,
      edit_password: '',
      personId: '',
      selectedRole: '',
      roles: [],
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
      currentRoleId: "",
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
      passwordRules:[
          v => !!v || "Required",
          v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
              "Password must be a minimum of 8 characters and have at least one letter and one number"
      ],
      confirmationRules:[
          v => !!v || "Required",
          v => v === this.edit_user.password || "Passwords must match"
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
          this.save_user_dialog = true;
          break;
        case 'Delete':
          this.delete_user_dialog = true;
          break;
        case 'Update':
          this.update_user_dialog = true;
          break;
        case 'EditPassword':
          this.edit_user_password_dlg = false;
          this.verify_edit_password_dialog = true;
      }
    },
    deleteUser(){
      this.delete_user_dialog = false;
      this.edit_person_dlg = false;
      UserDataService.delete(this.personId).then(response=>{
        this.$router.push({path: '/users'}).catch(err=>{console.log(err)});
        this.$toasted
            .show("User has been successfully deleted",{theme: 'bubble'})
            .goAway(1000);
      }).catch(e=>{console.log(e)});
    },
    updateSelectedRole(role) {

      var data = {
        userId: this.edit_role.userId,
        roleId: this.currentRoleId
      }
      var updatedDataRole = {
        roleId: role
      }

      UserRoleDataService.update(data.userId, data.roleId, updatedDataRole)
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
          this.roles.forEach((roleElement) => {
            roleElement.role = roleElement.name.charAt(0).toUpperCase() + roleElement.name.slice(1);
            // role.role = role.name.charAt(0).toUpperCase() + role.name.slice(1);
            // console.log(role.role);
          })
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
      this.personId = this.$route.params.personId;
      this.populateRoles();
      UserDataService.get(this.$route.params.personId)
        .then((response) => {
          this.edit_role.userId = response.data.user.id;
          this.edit_person = response.data;
          this.edit_user = response.data.user;
          this.edit_contact.phone = response.data.phones[0].number;

          this.contact_id.phone = response.data.phones[0].id;
          this.contact_id.email = response.data.emails[0].id;

          let roleNameToUpperCase = response.data.user.roles[0].name;

          let roleName = roleNameToUpperCase.charAt(0).toUpperCase() + roleNameToUpperCase.slice(1);

          this.view_role.role = roleName;
          this.currentRoleId = response.data.user.roles[0].id;

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
    updatePassword(){
      let salt = this.generateSalt();
      let password = this.encryptPassword(this.edit_user.password, salt)

      let data = {
        password: password,
        salt: salt
      };
      let personID = this.$route.params.personId;

      UserDataService.update(personID, data)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      this.edit_person_dlg = false;
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
      this.updateSelectedRole(this.edit_role.role);
    },
  },
  mounted() {
    this.setPerson();
  },
};
</script>
