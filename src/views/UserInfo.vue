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
import UserDataService from "../services/UserDataService";
import RoleDataService from "../services/RoleDataService";

export default {
  data() {
    return {
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
    },
  },
  mounted() {
    this.setPerson();
  },
};
</script>
            
        