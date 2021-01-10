<template>
  <v-container>
    <div class="red--text text--darken-4 page-title">Organization</div>
    <v-row
      ><!---------------------First Container Row-------------------------------->
      <v-col class="col-4"
        ><!----------------------Left Column-------------------------->
        <v-card elevation="3" class="mb-3">
          <v-card-title>
            <!---------------------Organization Basic Data-------------------------------->
            <a
              class="btn font-weight-bold blue-grey--text text-capitalize"
              @click="openDialog('Edit')"
            >
              {{ organization.name }}
            </a>
          </v-card-title>
          <v-card-subtitle style="margin-bottom: -30px">
            <!------------------------------------Organization Address Info------------------------------>
            <address class="text-capitalize">
              {{ organization.street_number }} {{ organization.street_name }}
              {{ organization.city }}, {{ organization.state }}
              {{ organization.zip }}

              <br />Counties
              <br />
              <span v-for="county in organization.counties" :key="county.id">
                {{ county.name }}
              </span>
            </address>
            <a
              :href="organization.website"
              class="red--text text--darken-3 body-3 mt-3"
            >
              {{ organization.website }}
            </a>
            <br />
            <v-btn text color="blue darken-1" @click="add_note_dlg = true">
              Update Note
            </v-btn>
            <!-- Note: {{latest_note.text}} -->
          </v-card-subtitle>
          <v-card-text>
            <!---------------------//Organization Basic Data-------------------------------->

            <!-----------------------Point of Contact--------------------------------->
            <br class="mt-3" />
            <a
              class="btn font-weight-bold blue-grey--text"
              @click="openDialog('Add POC')"
            >
              Add New Point of Contact
            </a>
            <div
              v-for="contact in organization_points_of_contact"
              v-bind:key="contact.id"
            >
              <a
                class="btn font-weight-bold blue-grey--text"
                @click="openDialog('Edit POC', contact.id)"
              >
                <span :ref="'first_name_' + contact.personId"
                  >{{ contact.first_name }}
                </span>
                <span :ref="'last_name_' + contact.personId"
                  >{{ contact.last_name }}
                </span>
              </a>
              <span v-for="phone in contact.phones" class="font-weight-thin">
                <span :ref="'phone_' + phone.id">
                  <span v-if="phone.isPrimary == true">
                    <br />{{ phone.number }}(P)
                  </span>
                </span>
              </span>
              <span v-for="phone in contact.phones" class="font-weight-thin">
                <span :ref="'phone_' + phone.id">
                  <span v-if="phone.isPrimary == false">
                    | {{ phone.number }}
                  </span>
                </span>
              </span>
              <span v-for="email in contact.emails" class="font-weight-thin">
                <span :ref="'email_' + email.id">
                  <span v-if="email.isPrimary == true">
                    <br />{{ email.address }}(P)
                  </span>
                </span>
              </span>
              <span v-for="email in contact.emails" class="font-weight-thin">
                <span :ref="'email_' + email.id">
                  <span v-if="email.isPrimary == false">
                    | {{ email.address }}
                  </span>
                </span>
              </span>
            </div>
            <!-----------------------//Point of Contact--------------------------------->
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <!--------------------------Organization Relationship Manager-------------------------------->
            <div>
              <a
                class="btn font-weight-bold blue-grey--text"
                @click="openDialog('Add RM')"
              >
                Add an Organization Manager
              </a>
            </div>

            <div
              v-for="manager in organization_relationship_managers"
              v-bind:key="manager.id"
            >
              <a
                class="btn font-weight-bold blue-grey--text"
                @click="openDialog('RM', manager.personId)"
              >
                <div class="font-weight-black mt-3">
                  <strong>
                    <span :ref="'relationship_manager_' + manager.personId">
                      {{ manager.person.first_name }}
                      {{ manager.person.last_name }} (Relationship Manager)
                    </span>
                  </strong>
                </div>
              </a>
              <div
                v-for="mphone in manager.person.phones"
                :key="mphone.number"
                class="font-weight-thin"
              >
                {{ mphone.number }}
              </div>
              <div
                v-for="memail in manager.person.emails"
                :key="memail.address"
                class="font-weight-thin"
              >
                {{ memail.address }}
              </div>
            </div>
            <!--------------------------//Organization Relationship Manager-------------------------------->
          </v-card-text>
        </v-card> </v-col
      ><!----------------------//Left Column-------------------------->

      <v-col
        ><!--------------------------Middle Column----------------->
        <v-card elevation="3" class="mb-3">
          <v-row>
            <v-col>
              <!--------------------------File List Table-------------------------------->
              <v-data-table
                :headers="headers"
                :search="search"
                :items="files"
                item-key="id"
                multi-sort
              >
                <template v-slot:top>
                  <v-text-field
                    v-model="search"
                    label="Search Files"
                    class="mx-4"
                  ></v-text-field>
                </template>
                <template v-slot:item.name="item">
                  <p>{{ item.item.name }}</p>
                </template>
                <template v-slot:item.date="item">
                  <p>{{ item.item.date }}</p>
                </template>
                <template v-slot:item.author="item">
                  <p>{{ item.item.author }}</p>
                </template>
                <template v-slot:item.download="item">
                  <v-btn depressed small @click="downloadFile(item)">
                    Download
                    <v-icon color="orange darken-4" right>
                      mdi-arrow-down
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:item.remove="item">
                  <v-btn depressed small @click="deleteFile(item)">
                    <v-icon color="orange darken-4" right>
                      mdi-trash-can
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:footer>
                  <v-row>
                    <v-col cols="7">
                      <v-file-input
                        label="Upload new file"
                        show-size
                        counter
                        dense
                        @change="filesChange"
                      ></v-file-input>
                    </v-col>
                    <v-col>
                      <v-btn
                        depressed
                        small
                        :disabled="upload_disabled"
                        @click="uploadFile"
                      >
                        Upload
                        <v-icon color="orange darken-4" right>
                          mdi-arrow-up
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
              </v-data-table>
              <!--------------------------//File List Table-------------------------------->
            </v-col>
          </v-row>
        </v-card> </v-col
      ><!--------------------------//Middle Column----------------->
    </v-row>
    <!--------------------------Dialogs-------------------------------->
    <POCDialog
      v-model="showPOCDialog"
      :poc_id="update_poc_id"
      :poc_title="poc_dlg_title"
      :poc_dlg_action="poc_dlg_action"
    />
    <RelationshipManagerDialog
      v-model="showRMDialog"
      :all_relationship_managers="all_relationship_managers"
      :current_relationship_manager_id="current_relationship_manager_id"
      :rm_title="rm_dlg_title"
      :rm_dlg_action="rm_dlg_action"
      :relationship_manager="current_relationship_manager"
    />

    <NoteDialog v-model="add_note_dlg" />

    <!---------------------------------Edit Organization Dialog------------------------------->
    <v-dialog v-model="organization_edit_dlg" max-width="1200px">
      <v-card>
        <v-form v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Relationship Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    label="Agency Name*"
                    required
                    v-model="organization.name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Street Number"
                    v-model="organization.street_number"
                    :rules="streetNumberRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Street Name"
                    v-model="organization.street_name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" sm="6" md="4">
                  <v-text-field
                    label="City"
                    v-model="organization.city"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="State"
                    v-model="organization.state"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="Zip"
                    v-model="organization.zip"
                    :rules="zipRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Website"
                    v-model="organization.website"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" v-for="county in all_counties">
                  <v-checkbox
                    v-model="organization_counties"
                    :value="county"
                    :label="county"
                  ></v-checkbox>
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
              @click="organization_edit_dlg = false"
            >
              Close
            </v-btn>
            <v-btn @click="openDialog('Delete')" color="red darken-1" text>
              Delete
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateOrganization" :disabled="!valid">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!---------------------------------//Edit Organization Dialog------------------------------>

    <!---------------------------------Delete Organization Dialog------------------------------>
    <v-dialog max-width="300" v-model="delete_organization_dialog">
      <v-card>
        <v-card-text>
          Are you sure you want to delete this organization?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="deleteOrganization" text color="red text-darken-1">
            Yes
          </v-btn>
          <v-btn
            @click="delete_organization_dialog = false"
            text
            color="blue text-darken-1"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------------------//Delete Organization Dialog------------------------------>
    <!--------------------------//Dialogs-------------------------------->
  </v-container>
</template>
<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

import PersonDataService from "@/services/PersonDataService";
import RelationshipManagerDataService from "../services/RelationshipManagerDataService";
import OrganizationDataService from "@/services/OrganizationDataService";
import NoteDataService from "../services/NoteDataService";
import FileDataService from "../services/FileDataService";
import NoteDialog from "./NoteDialog";
import RelationshipManagerDialog from "@/views/RelationshipManagerDialog";
import UserDataService from "@/services/UserDataService";
import ContactDataService from "@/services/ContactDataService";
import PointOfContactDataService from "@/services/PointOfContactDataService";
import POCDialog from "./POCDialog";
import EmailDataService from "@/services/EmailDataService";
import PhoneDataService from "@/services/PhoneDataService";
import CountyDataService from "@/services/CountyDataService";
import OrganizationCountyDataService from "@/services/OrganizationCountyDataService";

//TODO: Sanitize and validate form input
export default {
  name: "organization",
  components: {
    POCDialog,
    NoteDialog,
    RelationshipManagerDialog,
  },

  data() {
    return {
      confirm_delete: false,
      /**
       * Counties
       **/
      all_counties: [],
      organization_counties: [],
      unmapped_counties: [],

      /**
       * Organization
       */
      organization: "",
      organization_edit_dlg: false,
      delete_organization_dialog: "",

      /**
       * Relationship Managers
       **/
      delete_relationship_manager_dialog: false,
      update_mgr_dlg: false,
      add_mgr_dlg: false,
      showRMDialog: false,
      rm_dlg_action: "",
      rm_dlg_title: "",
      updated_relationship_manager: "",
      current_relationship_manager_id: "",
      current_relationship_manager: {},
      all_relationship_managers: [],
      organization_relationship_managers: [],

      /**
       * Point of Contact
       **/
      delete_poc_dialog: false,
      save_poc_dialog: false,
      showPOCDialog: false,
      poc: {},
      update_poc_id: "",
      edit_contact_id: "",
      poc_dlg_title: "",
      poc_dlg_action: "",
      updated_point_of_contact: "",
      all_points_of_contact: [],
      organization_points_of_contact: [],

      /**
       * Files
       **/
      files: [],
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "files",
      file_upload: "",
      upload_disabled: true,
      search: "",

      /**
       * Notes
       **/
      latest_note: "",
      add_note_dlg: false,
      valid_note: true,
      add_note_form: {
        text: "",
      },
      nameRules: [
        (v) => !!v || "Required",
        (v) => /\D\S$/.test(v) || "No white or empty spaces",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Phone number must be valid",
      ],
      streetNumberRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Street number must be valid",
      ],

      zipRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Zip number must be valid",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 1) || "Min 5 characters",
      },
    };
  },
  methods: {
    openDialog(dlg, id = null) {
      switch (dlg) {
        case "Add RM":
          this.rm_dlg_action = "Create";
          this.rm_dlg_title = "Assign Relationship Manager";
          this.current_relationship_manager_id = "";
          this.showRMDialog = true;
          break;
        case "RM":
          PersonDataService.get(id)
            .then((response) => {
              console.log(response.data);
              this.current_relationship_manager = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
          this.rm_dlg_title = "Change Relationship Manager";
          this.current_relationship_manager_id = id;
          this.rm_dlg_action = "Edit";
          this.showRMDialog = true;
          break;
        case "Edit POC":
          this.update_poc_id = id;
          this.showPOCDialog = true;
          this.poc_dlg_title = "Edit Point of Contact";
          this.poc_dlg_action = "Edit";
          break;
        case "Add POC":
          this.showPOCDialog = true;
          this.poc_dlg_title = "Add Point of Contact";
          this.poc_dlg_action = "Create";
          break;
        case "Edit":
          this.organization_edit_dlg = true;
          break;
        case "Delete":
          this.organization_edit_dlg = false;
          this.delete_relationship_dialog = true;
          break;
      }
    },
    /**
     * Notes
     */
    addNote(data) {
      data.organizationId = this.organization.id;
      //TODO: Set this id to current user
      data.personId = "9de1a7e1-8801-4024-9475-050644867c5b";
      data.type = "general";
      NoteDataService.create(data)
        .then((response) => {
          this.setOrganization(this.organization.id);
        })
        .catch((e) => {
          console.log(e);
        });
      // this.add_note_form.text = '';
      this.add_note_dlg = false;
    },

    /**
     * Files
     */
    downloadFile(obj) {
      let data = {
        fileId: obj.item.id,
      };
      FileDataService.download(obj.item.filepath, data)
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "file.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteFile(obj) {
      let data = {
        filePath: obj.item.filePath,
      };
      FileDataService.delete(obj.item.id, data)
        .then((response) => {
          this.populateFiles(this.organization.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file_upload);
      formData.append("organizationId", this.organization.id);
      //TODO: Set this id to current user
      formData.append("personId", "9de1a7e1-8801-4024-9475-050644867c5b");
      this.formData = formData;

      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      FileDataService.upload(this.formData)
        .then((x) => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
      this.formData = "";
      this.upload_disabled = true;
      this.populateFiles(this.organization.id);
      this.reset();
    },
    filesChange(files) {
      // handle file changes
      this.file_upload = files;
      this.upload_disabled = false;
    },
    populateFiles(id) {
      FileDataService.getAll(id)
        .then((response) => {
          this.files = response.data.map((file) => {
            let date = Intl.DateTimeFormat("en-US").format(
              new Date(file.createdAt)
            );
            return {
              filepath: file.filePath.substr(
                file.filePath.indexOf("/") + 1,
                file.filePath.length
              ),
              date: date,
              author: file.person.first_name + " " + file.person.last_name,
              name: file.fileName,
              id: file.id,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Organization
     **/
    deleteOrganization() {
      OrganizationDataService.delete(this.organization.id)
        .then((response) => {
          this.confirm_delete = false;
        })
        .catch((e) => {
          console.log(e);
        });
      this.$router.push({ path: "/organizations" }).catch((err) => {
        console.log(err);
      });
      this.$toasted
        .show("Organization has been successfully deleted", { theme: "bubble" })
        .goAway(1000);
    },
    updateOrganization() {
      /*
     Update organization data
     */
      this.organization_edit_dlg = false;
      let data = {
        name: this.organization.name,
        street_number: this.organization.street_number,
        street_name: this.organization.street_name,
        city: this.organization.city,
        state: this.organization.state,
        zip: this.organization.zip,
        county: this.organization.county,
        website: this.organization.website,
      };
      OrganizationDataService.update(this.organization.id, data)
        .then()
        .catch((e) => {
          console.log(e);
        });

      OrganizationCountyDataService.deleteOrganizationCounties(
        this.organization.id
      )
        .then((response) => {
          this.unmapped_counties.forEach((county) => {
            if (this.organization_counties.includes(county.name)) {
              let data = {
                organizationId: this.organization.id,
                countyId: county.id,
              };
              OrganizationCountyDataService.create(data)
                .then((response) => {
                  this.setOrganization();
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setOrganization() {
      OrganizationDataService.get(this.$route.params.organizationId)
        .then((response) => {
          this.notes = response.data.notes.map((note) => {
            let date = Intl.DateTimeFormat("en-US").format(
              new Date(note.createdAt)
            );
            let dateCreated = new Date(note.createdAt);
            return {
              id: note.id,
              text: note.text,
              date: date,
              author: note.person,
              type: note.type,
              createdAt: dateCreated,
            };
          });
          this.notes.sort((a, b) => b.createdAt - a.createdAt);
          this.latest_note = this.notes[0];
          response.data.counties.forEach((county) => {
            this.organization_counties.push(county.name);
          });
          PointOfContactDataService.getAll(response.data.id)
            .then(this.setPOC)
            .catch((e) => {
              console.log(e);
            });
          this.organization = response.data;
          this.organization_relationship_managers =
            response.data.relationship_managers;
          this.populateCounties();
          this.populateFiles(this.organization.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    populateCounties() {
      CountyDataService.getAll()
        .then((response) => {
          this.all_counties = response.data.map((county) => {
            return county.name;
          });
          this.unmapped_counties = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setPOC(res) {
      this.organization_points_of_contact = res.data;
    },
    populateRelationshipManagersList() {
      UserDataService.getAll()
        .then((response) => {
          this.all_relationship_managers = response.data.map((manager) => {
            return {
              name: manager.first_name + " " + manager.last_name,
              value: manager.id,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateSelectedManager(obj) {
      this.updated_relationship_manager = {
        value: obj.value,
      };
    },
    addRelationshipManager(data) {
      this.showRMDialog = false;
      data.organizationId = this.organization.id;

      RelationshipManagerDataService.create(data)
        .then((response) => {
          this.organization.relationship_managers = response.data;
          this.setOrganization();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateRelationshipManager(data, id) {
      this.showRMDialog = false;
      data.organizationId = this.organization.id;

      RelationshipManagerDataService.update(this.organization.id, id, data)
        .then((response) => {
          this.organization.relationship_managers = response.data;
          this.setOrganization();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteRelationshipManager(id) {
      this.showRMDialog = false;
      RelationshipManagerDataService.delete(this.organization.id, id)
        .then((response) => {
          this.setOrganization();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateContactInfo(primary, data, service, contactId = 0) {
      data.isPrimary = primary;
      if (contactId != 0) {
        service
          .update(contactId, data)
          .then((response) => {
            this.setOrganization();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        service
          .create(data)
          .then((response) => {
            this.setOrganization();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deletePOC(id) {
      PersonDataService.get(id)
        .then((response) => {
          let person = response.data;
          person.phones.forEach((phone) => {
            PhoneDataService.delete(phone.id).catch((e) => {
              console.log(e);
            });
          });

          person.emails.forEach((email) => {
            EmailDataService.delete(email.id).catch((e) => {
              console.log(e);
            });
          });
          return person.id;
        })
        .then((id) => {
          console.log("called");
          PersonDataService.delete(id).catch((e) => {
            console.log(e);
          });
          this.setOrganization();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePOC(id, data) {
      PersonDataService.get(id)
        .then((response) => {
          let person = response.data;
          let phoneData = {};
          if (data.primary_phone) {
            phoneData = {
              number: data.primary_phone,
            };
            let primaryId = person.phones.filter((phone) => {
              return phone.isPrimary;
            });
            if (primaryId.length > 0) {
              this.updateContactInfo(
                true,
                phoneData,
                PhoneDataService,
                primaryId[0].id
              );
            } else {
              phoneData.personId = person.id;
              this.updateContactInfo(true, phoneData, PhoneDataService);
            }
          }
          if (data.secondary_phone) {
            phoneData = {
              number: data.secondary_phone,
            };
            let secondaryId = person.phones.filter((phone) => {
              return phone.isPrimary == false;
            });
            if (secondaryId.length > 0) {
              this.updateContactInfo(
                false,
                phoneData,
                PhoneDataService,
                secondaryId[0].id
              );
            } else {
              phoneData.personId = person.id;
              this.updateContactInfo(false, phoneData, PhoneDataService);
            }
          }

          let emailData = {};
          if (data.primary_email) {
            emailData = {
              address: data.primary_email,
            };
            let primaryId = person.emails.filter((email) => {
              return email.isPrimary;
            });
            if (primaryId.length > 0) {
              this.updateContactInfo(
                true,
                emailData,
                EmailDataService,
                primaryId[0].id
              );
            } else {
              emailData.personId = person.id;
              this.updateContactInfo(true, emailData, EmailDataService);
            }
          }
          if (data.secondary_email) {
            emailData = {
              address: data.secondary_email,
            };
            let secondaryId = person.emails.filter((email) => {
              return email.isPrimary == false;
            });
            if (secondaryId.length > 0) {
              this.updateContactInfo(
                false,
                emailData,
                EmailDataService,
                secondaryId[0].id
              );
            } else {
              emailData.personId = person.id;
              this.updateContactInfo(false, emailData, EmailDataService);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
      /**
       * Update personal data
       */
      PersonDataService.update(id, data)
        .then()
        .catch((e) => {
          console.log(e);
        });
    },
    createPOC(data) {
      PersonDataService.create(data).then((response) => {
        let personId = response.data.id;
        let pocData = {
          personId: personId,
          organizationId: this.organization.id,
        };
        if (data.primary_phone) {
          let phoneData = {
            personId: personId,
            number: data.primary_phone,
            isPrimary: true,
          };
          PhoneDataService.create(phoneData)
            .then((pdresponse) => {
              console.log(pdresponse);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (data.secondary_phone) {
          let phoneData = {
            personId: personId,
            number: data.secondary_phone,
            isPrimary: false,
          };
          PhoneDataService.create(phoneData)
            .then((sdresponse) => {
              console.log(sdresponse);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (data.primary_email) {
          let emailData = {
            personId: personId,
            address: data.primary_email,
            isPrimary: true,
          };
          EmailDataService.create(emailData)
            .then((emres) => {
              console.log(emres);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (data.secondary_email) {
          let emailData = {
            personId: personId,
            address: data.secondary_email,
            isPrimary: false,
          };
          EmailDataService.create(emailData)
            .then((semailres) => {
              console.log(semailres);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        PointOfContactDataService.create(pocData)
          .then((response) => {
            console.log("POC Created:\n" + response);
            console.log(response);
            this.setOrganization();
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    setEditContact(id) {
      this.edit_contact_id = id;
    },
    populatePointOfContactList() {
      ContactDataService.getAll()
        .then((response) => {
          this.all_points_of_contact = response.data.map((person) => {
            return {
              name: person.first_name + " " + person.last_name,
              value: person.id,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateSelectedPointOfContact(obj) {
      this.updated_point_of_contact = {
        value: obj.value,
      };
    },
    addPointOfContact() {
      this.assign_poc_dlg = false;
      let organizationId = this.organization.id;

      let data = {
        organizationId: organizationId,
        personId: this.updated_point_of_contact.value,
      };
      PointOfContactDataService.create(data)
        .then((response) => {
          this.setOrganization();
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePointOfContact() {
      this.assign_poc_dlg = false;

      let data = {};

      let personId = this.organization_points_of_contact[0].id;
      PersonDataService.update(personId, data)
        .then((response) => {
          this.setOrganization();
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
  },
  computed: {
    headers() {
      let headers = [
        { text: "File Name", value: "name", width: "80px" },
        { text: "Date", value: "date", width: "80px" },
        { text: "Author", value: "author", width: "100px" },
        { text: "", value: "download", width: "100px" },
        { text: "", value: "remove", width: "100px" },
      ];
      return headers;
    },
  },
  mounted() {
    this.reset();
    this.setOrganization();
    this.populateRelationshipManagersList();
    this.populatePointOfContactList();
    this.populateCounties();
  },
};
</script>

<style lang="sass" scoped>
.v-icon.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-icon__text
    color: #000
</style>