<template>
  <v-container>
    <span class="hidden-md-and-down">
      <div class="item-title">
          {{ organization.name }}
        <v-btn
          icon
          class="ml-3"
          @click="openDialog('Edit')"
          v-if="verifyAccess('update')"
        >
          <v-icon
            style="color: #9F9FA3"
            class="mdi mdi-pencil"
            small
          ></v-icon>
        </v-btn>
      </div>
    </span>
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="4">
                <v-card
                    class="pa-1"
                    elevation="3"
                    shaped
                    style="background-color: #fff"

                >
                  <v-card
                      class="pa-3"
                      shaped
                      style="background-color: #6D6E70"
                  >
                    <v-card-text>
              <span class="sub-data">
                {{ organization.street_number }} {{ organization.street_name}}
                {{ organization.city }}, {{ organization.state }} {{ organization.zip }}
                <br/>
                <span v-for="county in organization.counties" :key="county.id">
                  {{county.name}}
                </span><br/>
                  <a :href="organization.website" style="color: #C4DFF6">
                  {{ organization.website }}
                </a><span v-if="organization.phones != ''"> | {{ organization.phones[0].number}}</span>
              </span>
                    </v-card-text>
                  </v-card>
                </v-card>
                <v-card
                    class="pa-1 mt-15"
                >
                  <v-card
                      class="card-header-block pa-3"
                      rounded
                  >
                    <v-card-text >
                      <div class="card-header-title">Details</div>
                      <span class="card-header-subtitle">{{ organization.service }}</span>
                    </v-card-text>
                  </v-card>
                  <v-card-text>
                    <div class="card-label">National DCS MOU Partner: </div> {{ organization.mou }}

                    <div class="card-label">Lines of Business: </div>
                    <div v-for="lob in organization.line_of_businesses" :key="lob.id">
                      {{lob.name}}
                    </div>

                    <div class="card-label">ARC Relationship: </div>
                    <div v-for="arcrel in organization.arc_relationships" :key="arcrel.id">
                      {{arcrel.name}}
                    </div>

                    <div class="card-label">Agency Types: </div>
                    <div v-for="agtype in organization.agency_types" :key="agtype.id">
                      {{agtype.name}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="8">
                <v-card

                    class="pl-1 mt-1"
                    style="background-color: #7F181B"
                    elevation="1"
                >
                  <v-card
                      class="pa-3"
                      style="background-color: #6D6E70"
                      min-height="400px"
                      v-scroll
                  >
                    <v-card-text>
                      <div class="card-header-title">Important Notes</div>
                      <div class="card-label-light">
                        Last Contact Made:
                        <v-btn
                            icon
                            style="color: #C4DFF6"
                            v-show="verifyAccess('update')"
                            @click="contact_note_dlg=true"
                        >
                          <v-icon
                              class="mdi mdi-comment-outline"
                              small
                          ></v-icon>
                        </v-btn>
                      </div>
                      <div class="sub-data">{{ organization.last_contact }}</div>
                      <div class="card-label-light">
                        Opportunities/Actions Needed to Improve Profile:
                        <v-btn
                            v-show="verifyAccess('update')"
                            icon
                            style="color: #C4DFF6"
                            @click="op_action_dlg=true"
                        >
                          <v-icon
                              class="mdi mdi-comment-outline"
                              small></v-icon>
                        </v-btn>

                      </div>
                      <div class="sub-data">{{ organization.action }}</div>
                      <div class="card-label-light">
                        Note:
                        <v-btn
                            v-show="verifyAccess('update')"
                            icon
                            style="color: #C4DFF6"
                            @click="add_note_dlg=true"
                        >
                          <v-icon
                              small
                              class="mdi mdi-comment-outline"></v-icon>
                        </v-btn>
                      </div>
                      <div class="sub-data">{{ organization.notes }}</div>
                    </v-card-text>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card elevation="3" class="pa-1 mt-15">
              <v-card
                  class="card-header-block pa-3"
                  rounded
              >
                <v-card-text>
                  <div class="card-header-title">Files</div>
                </v-card-text>
              </v-card>
              <v-card-text>
                <!--------------------------File List Table-------------------------------->
                <v-row>
                  <v-text-field
                      class="shrink mr-3"
                      label="Search"
                      v-model="search"
                      append-icon="mdi-magnify"
                      dense
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn
                      fab
                      elevation="3"
                      small
                      class="ml-3"
                      color="white"
                      @click="upload_file_dlg=true"
                  >
                    <v-icon class="mdi mdi-dark mdi-upload">
                    </v-icon>
                  </v-btn>
                </v-row>
                <v-data-table
                    :headers="headers"
                    :search="search"
                    :items="files"
                    item-key="id"
                    multi-sort
                >
                  <template v-slot:item.name="item">
                    <p>{{ item.item.name  }}</p>
                  </template>
                  <template v-slot:item.date="item">
                    <p>{{ item.item.date }}</p>
                  </template>
                  <template v-slot:item.author="item">
                    <p>{{ item.item.author }}</p>
                  </template>
                  <template v-slot:item.download="item">
                    <v-btn
                        icon
                        small
                        @click="downloadFile(item)"
                    >
                      <v-icon
                          color="orange darken-4"
                      >
                        mdi-arrow-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:item.remove="item">
                    <v-btn
                        icon
                        small
                        @click="deleteFile(item)"
                    >
                      <v-icon
                          color="grey"
                          class="mdi mdi-trash-can-outline"
                      >
                      </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
                <!--------------------------//File List Table-------------------------------->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col>
            <v-card
                elevation="1"
                class="pl-1 mt-14"
                style="background-color: #7F181B"
                rounded
            >
              <v-card
                  class="card-header-block pa-3"
                  min-height="175px"
              >
                <v-card-text>
                  <div class="card-header-title">Contact
                    <v-btn
                        icon
                        style="color: #7F181B"
                        v-show="verifyAccess('update')"
                    >
                      <v-icon
                          class="mdi mdi-account-plus"
                          @click="openDialog('Add POC')"
                      >
                      </v-icon>
                    </v-btn>
                  </div>
                  <div class="card-header-subtitle">{{ organization.contact_protocol }}</div>
                  <div v-for="contact in organization_points_of_contact" v-bind:key="contact.id">
                    <div :ref="'first_name_' + contact.personId">
                      <span class="data">{{ contact.first_name }} {{ contact.last_name }}</span>
                      <v-btn
                          icon
                          small
                          class="pl-3"
                          v-show="verifyAccess('update')"
                          @click="openDialog('Edit POC', contact.id)"
                      >
                        <v-icon
                            small
                            class="mdi mdi-pencil"
                            style="color: #C4DFF6"
                        ></v-icon>
                      </v-btn>
                    </div>
                    <span v-for="phone in contact.phones" v-bind:key="phone.number" class="sub-data">
                <span :ref="'phone_' + phone.id">
                  <span v-if="phone.isPrimary==true">
                    {{ phone.number }}(P)
                  </span>
                </span>
            </span>
                    <span v-for="phone in contact.phones" class="sub-data">
                <span :ref="'phone_' + phone.id">
                  <span v-if="phone.isPrimary==false">
                   | {{ phone.number }}
                  </span>
                </span>
            </span>
                    <span v-for="email in contact.emails" class="sub-data">
                <span :ref="'email_' + email.id">
                  <span v-if="email.isPrimary==true">
                    <br/>{{ email.address }}(P)
                  </span>
                </span>
            </span>
                    <span v-for="email in contact.emails" class="sub-data">
                <span :ref="'email_' + email.id">
                  <span v-if="email.isPrimary==false">
                     | {{ email.address }}
                  </span>
                </span>
            </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-card>
            <v-card
                class="pl-1 mt-5"
                style="background-color: #7F181B"
                elevation="1"
                rounded
            >
              <v-card
                  style="background-color: #6D6E70"
                  class="pa-3"
                  min-height="175px"
              >
                <v-card-text>
                  <div class="card-header-title">Relationship Manager
                    <v-btn
                        icon
                        style="color: #7F181B"
                        v-show="verifyAccess('reassign')"
                    >
                      <v-icon
                          class="mdi mdi-account-plus"
                          @click="openDialog('Add RM')"
                      >
                      </v-icon>
                    </v-btn>
                  </div>
                  <div v-for="manager in organization_relationship_managers" v-bind:key="manager.id">
                    <div :ref="'relationship_manager_' + manager.personId" class="data">
                      {{ manager.person.first_name }} {{ manager.person.last_name }}
                      <v-btn
                          icon
                          style="color: #C4DFF6"
                          v-if="verifyAccess('reassign')"
                          @click="openDialog('RM', manager.personId)"
                      >
                        <v-icon
                            small
                            class="mdi mdi-pencil"
                        ></v-icon>
                      </v-btn>
                    </div>
                    <div v-for="mphone in manager.person.phones" :key="mphone.number" class="sub-data">{{ mphone.number }}</div>
                    <div v-for="memail in manager.person.emails" :key="memail.address" class="sub-data"> {{ memail.address }}</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>


      </v-col>
      </v-row>
    <v-row><!---------------------First Container Row-------------------------------->
      <!---------------------------------Small Screen------------------------------------->
      <v-col
          class="hidden-md-and-up"
          cols="12"
      >
        <v-card>
          <v-toolbar
              color="grey"
          >
            <v-toolbar-title
                class="white--text"
            >
               <span v-if="verifyAccess('update')">
                <a class="btn text-md-h2 text-sm-h5 text-capitalize" @click="openDialog('Edit')">
                  {{ organization.name }}
                </a><br/>
                </span>
                <span v-else class="text-md-h2 text-sm-h5 text-capitalize">
                  {{ organization.name }}<br/>
                </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-title>

            <v-card-subtitle>
              <a :href="organization.website">
                <span style="color: #C4DFF6"> {{ organization.website }} </span>
              </a><span v-if="organization.phones != ''"><br/> {{ organization.phones[0].number}}</span>
              <br/>
              {{ organization.street_number }} {{ organization.street_name}}
              {{ organization.city }}, {{ organization.state }} {{ organization.zip }}
              <br/>
              <span v-for="county in organization.counties" :key="county.id">
                {{county.name}}
              </span>
            </v-card-subtitle>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>Notes</v-card-title>
          <v-card-text>
            <span v-if="verifyAccess('update')">
             <a class="btn font-weight-bold blue-grey--text" @click="contact_note_dlg=true">
               <strong>Last Contact Made: </strong>
             </a>
            </span>
            <span v-else>
              <strong>
                 Last Contact Made:
              </strong>
            </span>
            {{ organization.last_contact }}<br/>
            <span v-if="verifyAccess('update')">
             <a class="btn font-weight-bold blue-grey--text" @click="op_action_dlg=true">
               Opportunities/Actions Needed to Improve Profile:
             </a>
            </span>
            <span v-else>
              <strong>
               Opportunities/Actions Needed to Improve Profile:
              </strong>
            </span>
            {{ organization.action }}<br/>
            <span v-if="verifyAccess('update')">
               <a class="btn font-weight-bold blue-grey--text" @click="add_note_dlg=true">
                 <strong>Note: </strong>
               </a>
            </span>
            <span v-else>
               <strong>
                 Note:
               </strong>
            </span>
            {{ organization.notes }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <strong>National DCS MOU Partner: </strong> {{ organization.mou }}<br/>
            <strong>Organization Service: </strong> {{ organization.service }}<br/>
            <strong>Lines of Business: </strong>
            <br/>
            <span v-for="lob in organization.line_of_businesses" :key="lob.id">
                      {{lob.name}}
                  </span>
            <br/> ARC Relationship:
            <span v-for="arcrel in organization.arc_relationships" :key="arcrel.id">
                      {{arcrel.name}}
                  </span>
            <br/><strong>Agency Types: </strong>
            <span v-for="agtype in organization.agency_types" :key="agtype.id">
                      {{agtype.name}}
                  </span>
            <br/><strong>Service: </strong>
            {{ organization.service }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title>Contacts</v-card-title>
          <v-card-text>
            <div>
            <strong>Organization Contact Protocol:<br/></strong> {{ organization.contact_protocol }}<br/>
            <a v-show="verifyAccess('update')" class="btn font-weight-bold blue-grey--text" @click="openDialog('Add POC')">
              Add New Point of Contact
            </a>
            </div>
            <div v-for="contact in organization_points_of_contact" v-bind:key="contact.id">
              <a class="btn font-weight-bold blue-grey--text" @click="openDialog('Edit POC', contact.id)">
                <span :ref="'first_name_' + contact.personId">{{ contact.first_name }} </span>
                <span :ref="'last_name_' + contact.personId">{{ contact.last_name }} </span>
              </a>
              <span v-for="phone in contact.phones" v-bind:key="phone.number" class="font-weight-thin">
                  <span :ref="'phone_' + phone.id">
                    <span v-if="phone.isPrimary==true">
                      <br/>{{ phone.number }}(P)
                    </span>
                  </span>
							</span>
              <span v-for="phone in contact.phones" class="font-weight-thin">
                  <span :ref="'phone_' + phone.id">
                    <span v-if="phone.isPrimary==false">
                     | {{ phone.number }}
                    </span>
                  </span>
							</span>
              <span v-for="email in contact.emails" class="font-weight-thin">
                  <span :ref="'email_' + email.id">
                    <span v-if="email.isPrimary==true">
                      <br/>{{ email.address }}(P)
                    </span>
                  </span>
							</span>
              <span v-for="email in contact.emails" class="font-weight-thin">
                  <span :ref="'email_' + email.id">
                    <span v-if="email.isPrimary==false">
                       | {{ email.address }}
                    </span>
                  </span>
							</span>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title>Relationship Manager</v-card-title>
          <v-card-text>
            <div>
              <a v-show="verifyAccess('reassign')" class="btn font-weight-bold blue-grey--text" @click="openDialog('Add RM')">
                Add an Organization Manager
              </a>
            </div>
            <div v-for="manager in organization_relationship_managers" v-bind:key="manager.id">
              <a  v-if="verifyAccess('reassign')" class="btn font-weight-bold blue-grey--text" @click="openDialog('RM', manager.personId)">
                <div class="font-weight-black mt-3">
                  <strong>
                    <span :ref="'relationship_manager_' + manager.personId">
                      {{ manager.person.first_name }} {{ manager.person.last_name }} (Relationship Manager)
                    </span>
                  </strong>
                </div>
              </a>
              <span  v-else class="btn font-weight-bold blue-grey--text">
                <div class="font-weight-black mt-3">
                  <strong>
                    <span :ref="'relationship_manager_' + manager.personId">
                      {{ manager.person.first_name }} {{ manager.person.last_name }} (Relationship Manager)
                    </span>
                  </strong>
                </div>
              </span>
              <div v-for="mphone in manager.person.phones" :key="mphone.number" class="font-weight-thin">{{ mphone.number }}</div>
              <div v-for="memail in manager.person.emails" :key="memail.address" class="font-weight-thin"> {{ memail.address }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!---------------------------------//Small Screen------------------------------------->
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
    <!-------------------------- Note Dialog------------------------>
    <v-dialog
        v-model="add_note_dlg"
        max-width="400px"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span class="headline">Organization Note</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-textarea
                    label="Notes"
                    v-model="organization.notes"
                ></v-textarea>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="add_note_dlg=false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="updateOrganization"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <!--------------------------//Note Dialog------------------------>

    <!--------------------------Last Contact Note Dialog------------------------>
    <v-dialog
      v-model="contact_note_dlg"
      max-width="300px"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span class="headline">Last Contact Made</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                    label="Last Contact"
                    v-model="organization.last_contact"
                ></v-text-field>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="contact_note_dlg=false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="updateOrganization"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <!--------------------------//Last Contact Note Dialog------------------------>

    <!-----------------------------Op Action Dialog------------------------------------------>
    <v-dialog
        v-model="op_action_dlg"
        max-width="400px"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span class="headline">Opportunities/Actions for Improvement</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-textarea
                    label="Opportunities"
                    v-model="organization.action"
                ></v-textarea>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="op_action_dlg=false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="updateOrganization"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <!--------------------------//Op Action Dialog------------------------>
    <v-dialog
      v-model="upload_file_dlg"
      max-width="500px"
  >
    <v-card>
      <form id="uploadForm">
      <v-card-title>
        Upload a file for this Organization
      </v-card-title>
      <v-card-text>
          <v-file-input
              id="fileInput"
              label="Upload new file"
              show-size
              counter
              dense
              @change="filesChange"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn
              depressed
              small
              :disabled="upload_disabled"
              @click="uploadFile"
          >
            Upload
            <v-icon
                color="orange darken-4"
                right
            >
              mdi-arrow-up
            </v-icon>
          </v-btn>
      </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
    <!---------------------------------Edit Organization Dialog------------------------------->
    <v-dialog
        v-model="organization_edit_dlg"
        max-width="700px"
    >
      <v-card>
        <v-form
          v-model="orgValid"
        >
          <v-card-title>
            <span class="headline">Organization Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      label="*Agency Name"
                      required
                      :rules="businessNameRule"
                      v-model="organization.name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                  <v-text-field
                      label="*Street Number"
                      required
                      :rules="streetNumberRule"
                      v-model="organization.street_number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                  <v-text-field
                      label="*Street Name"
                      required
                      :rules="streetNameRule"
                      v-model="organization.street_name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    md="3"
                >
                  <v-text-field
                      label="*City"
                      required
                      :rules="cityRule"
                      v-model="organization.city"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="2"
                >
                  <v-select
                    required
                    :items="states"
                    :rules="stateRule"
                    v-model="organization.state"
                    label="*State"
                  >
                  </v-select>
                </v-col>
                <v-col
                    cols="12"
                    md="2"
                >
                  <v-text-field
                      label="*Zip"
                      required
                      :rules="zipRule"
                      v-model="organization.zip"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      label="Website"
                      v-model="organization.website"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                >
                  <v-text-field
                      label="Phone"
                      v-model="organization.phones[0].number"
                      :rules="businessPhoneRule"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-select
                    multiple
                    required
                    :rules="countyRule"
                    v-model="organization_counties"
                    :items="all_counties"
                    label="*Counties"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="mou_options"
                    required
                    :rules="mouRule"
                    v-model="organization.mou"
                    label="*MOU Partner?"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                      multiple
                      required
                      :rules="mouRule"
                      v-model="organization_lines_of_business"
                      :items="all_lines_of_business"
                      label="*Line of Business"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-select
                      multiple
                      required
                      :rules="arcFunctionRule"
                      v-model="organization_arc_relationships"
                      :items="all_arc_relationships"
                      label="*Arc Relationships"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-select
                      multiple
                      v-model="organization_agency_types"
                      :rules="agencyRule"
                      :items="all_agency_types"
                      label="*Agency Types"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-textarea
                  v-model="organization.contact_protocol"
                  label="Preferred Method of Contact per RM"
                ></v-textarea>
              </v-row>
              <v-row>
                <v-textarea
                    required
                    v-model="organization.service"
                    :rules="serviceDescriptionRule"
                    label="*Additional Notes"
                ></v-textarea>
              </v-row>
            </v-container>
            <small>*Indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="organization_edit_dlg=false"
            >
              Close
            </v-btn>
            <v-btn
                @click="openDialog('Delete')"
                color="red darken-1"
                text
            >
              Delete
            </v-btn>
            <v-btn
                :disabled="!orgValid"
                color="blue darken-1"
                text
                @click="updateOrganization"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!---------------------------------//Edit Organization Dialog------------------------------>

    <!---------------------------------Delete Organization Dialog------------------------------>
    <v-dialog
        max-width="300"
        v-model="delete_organization_dialog"
    >
      <v-card>
        <v-card-text>
          Are you sure you want to delete this organization?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              @click="deleteOrganization"
              text
              color="red text-darken-1">
            Yes
          </v-btn>
          <v-btn
              @click="delete_organization_dialog=false"
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

/* eslint-disable */


const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

import OrganizationLineOfBusinessDataService from "@/services/OrganizationLineOfBusinessDataService";
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
import CountyDataService from "@/services/CountyDataService"
import OrganizationCountyDataService from "@/services/OrganizationCountyDataService";
import LineOfBusinessDataService from "@/services/LineOfBusinessDataService";
import OrganizationArcRelationshipDataService from "@/services/OrganizationArcRelationshipDataService";
import OrganizationAgencyTypeDataService from "@/services/OrganizationAgencyTypeDataService";
import ArcRelationshipDataService from "@/services/ArcRelationshipDataService";
import AgencyTypeDataService from "@/services/AgencyTypeDataService";
import RoleDataService from "../services/RoleDataService";
import "../assets/scss/organization.scss";
//TODO: Sanitize and validate form input
export default {
  name: "organization",
  components: {
    POCDialog,
    NoteDialog,
    RelationshipManagerDialog
  },

  data() {
    return {
      currentUserId: '',
      isOwner: false,
      permissions: [],
      confirm_delete: false,

      /**
       * Form validation
       **/
      orgValid: true,
      businessNameRule: [
        v => !!v || 'A business name is required',
      ],
      contactNameRule: [
        v => !!v || 'A contact name is required',
      ],
      streetNumberRule: [
        v => /^[0-9]+$/.test(v) || 'The street number is required and must only be numeric'
      ],
      streetNameRule:[
        v => !!v || 'A street name is required',
      ],
      cityRule:[
        v => !!v || 'A city must be selected',
      ],
      stateRule:[
        v => !!v || 'A state must be selected'
      ],
      countyRule:[
        v => !!v || 'At least one county must be selected'
      ],
      zipRule:[
        v => !!v || 'A zip code is required',
        v => /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(v) || 'Please, input a valid zip code'
      ],
      businessPhoneRule:[
        v => /^((1-)?\d{3}-\d{3}-\d{4}){0,1}$/.test(v) || 'Please, input a valid phone number with format XXX-XXX-XXXX'
      ],
      email: [
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'Please, input a valid email address'
      ],
      mouRule:[
        v => !!v || 'MOU must be selected'
      ],
      lobRule:[
        v => !!v || 'A line of business must be selected'
      ],
      arcFunctionRule:[
        v => !!v || 'ARC type must be selected'
      ],
      serviceDescriptionRule:[
        v => !!v || 'Please provide a service description'
      ],
      agencyRule:[
        v => !!v || 'An agency type must be selected'
      ],
      arcFunctionRule:[
        v => !!v || 'ARC type must be selected'
      ],

      /**
       * Counties
       **/
      all_counties: [],
      organization_counties: [],
      unmapped_counties: [],

      /**
       * States
       **/
      organization_state:'',
      states:[
        "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT",
        "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID",
        "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME",
        "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND",
        "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK",
        "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX",
        "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV",
        "WY"
      ],

      /**
       * MOU
       **/
      mou_options:["Yes", "No", "Maybe"],

      /**
       * Contact Note
       **/
      contact_note_dlg: false,

      /**
       * Opportunity Action Dialog
       **/
      op_action_dlg: false,

      /**
       * Line of Business
       **/
      all_lines_of_business: [],
      organization_lines_of_business: [],
      unmapped_lines_of_business: [],

      /**
       * Arc Relationship
       **/
      all_arc_relationships: [],
      organization_arc_relationships: [],
      unmapped_arc_relationships: [],

      /**
       * Agency Type
       **/
      all_agency_types: [],
      organization_agency_types: [],
      unmapped_agency_types: [],

      /**
       * Organization
       */
      organization: '',
      organization_edit_dlg: false,
      delete_organization_dialog: '',

      /**
       * Relationship Managers
       **/
      delete_relationship_manager_dialog: false,
      update_mgr_dlg: false,
      add_mgr_dlg: false,
      showRMDialog: false,
      rm_dlg_action: '',
      rm_dlg_title: '',
      updated_relationship_manager: '',
      current_relationship_manager_id: '',
      current_relationship_manager: {},
      all_relationship_managers:[],
      organization_relationship_managers: [],

      /**
       * Point of Contact
       **/
      delete_poc_dialog: false,
      save_poc_dialog: false,
      showPOCDialog: false,
      poc: {},
      update_poc_id: '',
      edit_contact_id: '',
      poc_dlg_title: '',
      poc_dlg_action: '',
      updated_point_of_contact: '',
      all_points_of_contact:[],
      organization_points_of_contact: [],

      /**
       * Files
       **/
      files: [],
      uploadedFiles: [],
      upload_file_dlg: false,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'files',
      file_upload: '',
      upload_disabled: true,
      search: '',

      /**
       * Notes
       **/
      latest_note: '',
      add_note_dlg: false,
      valid_note: true,
      add_note_form: {
        text: '',
      },
    }
  },
  methods: {
    openDialog(dlg, id=null){
      switch(dlg){
        case "Add RM":
          this.rm_dlg_action = 'Create';
          this.rm_dlg_title = "Assign Relationship Manager";
          this.current_relationship_manager_id = '';
          this.showRMDialog = true;
          break;
        case "RM":
          PersonDataService.get(id)
              .then(response=>{
                this.current_relationship_manager = response.data;
              })
              .catch(e=>{console.log(e)});
          this.rm_dlg_title = "Change Relationship Manager";
          this.current_relationship_manager_id = id;
          this.rm_dlg_action = 'Edit';
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
          this.delete_organization_dialog = true;
          break;
      }
    },

    /**
     * Notes
     */
    addNote(data){
      data.organizationId = this.organization.id;
      data.personId = this.currentUserId;
      data.type = 'general';
      NoteDataService.create(data).then(response=>{
        this.setOrganization(this.organization.id);
      }).catch(e=>{console.log(e)});
      // this.add_note_form.text = '';
      this.add_note_dlg=false;
    },

    /**
     * Files
     */
    downloadFile(obj){
      let data = {
        fileId: obj.item.id
      }
      FileDataService.download(obj.item.filepath, data)
          .then(response=>{
            let fileURL = window.URL.createObjectURL(new Blob([response.data]));
            let fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'file.pdf');
            document.body.appendChild(fileLink);

            fileLink.click();
          })
          .catch(e=>{console.log(e)});
    },
    deleteFile(obj){
      let data = {
        filePath: obj.item.filePath
      }
      FileDataService.delete(obj.item.id, data)
          .then(response=>{
            this.populateFiles(this.organization.id);
          })
          .catch(e=>{
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
      formData.append('file', this.file_upload);
      formData.append('organizationId', this.organization.id);
      formData.append('personId',this.currentUserId );
      this.formData = formData;

      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      FileDataService.upload(this.formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      this.formData = '';
      this.upload_disabled=true;
      this.populateFiles(this.organization.id)
      let form = document.getElementById("uploadForm");
      form.reset();
      this.reset();
    },
    filesChange(files) {
      // handle file changes
      this.file_upload = files;
      this.upload_disabled = false;
    },
    /**
     * Organization
     **/
    deleteOrganization(){
      OrganizationDataService.delete(this.organization.id)
          .then(response=>{
            this.confirm_delete = false;
          })
          .catch(e=>{console.log(e)});
      this.$router.push({path: '/organizations'}).catch(err=>{console.log(err)});
      this.$toasted
          .show("Organization has been successfully deleted",{theme: 'bubble'})
          .goAway(1000);
    },
    populateFiles(id){
      FileDataService.getAll(id)
          .then(response=>{
            this.files = response.data.map(file=>{
              let date = Intl.DateTimeFormat('en-US').format(new Date(file.createdAt));
              return{
                filepath: file.filePath.substr(file.filePath.indexOf("/")+1, file.filePath.length),
                date: date,
                author: file.person.first_name +" "+file.person.last_name,
                name: file.fileName,
                id: file.id
              }
            });
          })
    .catch(e=>{console.log(e)});
    },
    updateOrganization(){
      /*
     Update organization data
     */
      this.organization_edit_dlg = false;
      let data = {
        "name": this.organization.name,
        "street_number": this.organization.street_number,
        "street_name": this.organization.street_name,
        "city": this.organization.city,
        "state": this.organization.state,
        "zip": this.organization.zip,
        "county": this.organization.county,
        "website": this.organization.website,
        "mou": this.organization.mou,
        "contact_protocol": this.organization.contact_protocol,
        "last_contact": this.organization.last_contact,
        "service": this.organization.service,
        "notes": this.organization.notes,
        "action": this.organization.action
      }
      OrganizationDataService.update(this.organization.id, data)
          .then()
          .catch(e=>{console.log(e)});
      PhoneDataService.update(this.organization.phones[0].id, {number: this.organization.phones[0].number})
          .then()
          .catch(e=>{console.log(e)});

      OrganizationCountyDataService.deleteOrganizationCounties(this.organization.id)
          .then(response=>{
            this.unmapped_counties.forEach(county=>{
              if(this.organization_counties.includes(county.name)){
                let data = {
                  organizationId: this.organization.id,
                  countyId: county.id
                }
                OrganizationCountyDataService.create(data)
                    .then(response=>{
                      this.setOrganization();
                    }).catch(e=>{console.log(e)});
              }
            })
          })
          .catch(e=>{console.log(e)});
      OrganizationLineOfBusinessDataService.deleteOrganizationLinesOfBusiness(this.organization.id)
          .then(response=>{
            this.unmapped_lines_of_business.forEach(line_of_business=>{
              if(this.organization_lines_of_business.includes(line_of_business.name)){
                let data = {
                  organizationId: this.organization.id,
                  lineOfBusinessId: line_of_business.id
                }
                OrganizationLineOfBusinessDataService.create(data)
                    .then(response=>{
                      this.setOrganization();
                    }).catch(e=>{console.log(e)});
              }
            })
          })
          .catch(e=>{console.log(e)});

      OrganizationArcRelationshipDataService.deleteOrganizationArcRelationships(this.organization.id)
          .then(response=>{
            this.unmapped_arc_relationships.forEach(arc_relationship=>{
              if(this.organization_arc_relationships.includes(arc_relationship.name)){
                let data = {
                  organizationId: this.organization.id,
                  arcRelationshipId: arc_relationship.id
                }
                OrganizationArcRelationshipDataService.create(data)
                    .then(response=>{
                      this.setOrganization();
                    }).catch(e=>{console.log(e)});
              }
            })
          })
          .catch(e=>{console.log(e)});
      OrganizationAgencyTypeDataService.deleteOrganizationAgencyTypes(this.organization.id)
          .then(response=>{
            this.unmapped_agency_types.forEach(agency_type=>{
              if(this.organization_agency_types.includes(agency_type.name)){
                let data = {
                  organizationId: this.organization.id,
                  agencyTypeId: agency_type.id
                }
                OrganizationAgencyTypeDataService.create(data)
                    .then(response=>{
                      this.setOrganization();
                    }).catch(e=>{console.log(e)});
              }
            })
          })
          .catch(e=>{console.log(e)});
    },
    setOrganization(){
      OrganizationDataService.get(this.$route.params.organizationId)
          .then(response=>{
            // this.notes = response.data.notes.map(note=>{
            //   let date = Intl.DateTimeFormat('en-US').format(new Date(note.createdAt));
            //   let dateCreated = new Date(note.createdAt);
            //   return {
            //     id: note.id,
            //     text: note.text,
            //     date: date,
            //     author: note.person,
            //     type: note.type,
            //     createdAt: dateCreated
            //   }
            // });
            // this.notes.sort((a,b)=>b.createdAt-a.createdAt);
            // this.latest_note = this.notes[0];
            response.data.counties.forEach(county=>{
              this.organization_counties.push(county.name);
            });
            response.data.line_of_businesses.forEach(lob=>{
              this.organization_lines_of_business.push(lob.name);
            });
            response.data.arc_relationships.forEach(arcrel=>{
              this.organization_arc_relationships.push(arcrel.name);
            });
            response.data.agency_types.forEach(agtype=>{
              this.organization_agency_types.push(agtype.name);
            });
            PointOfContactDataService.getAll(response.data.id)
                .then(this.setPOC)
                .catch(e=>{console.log(e)});
            this.organization = response.data;
            if(this.organization.phones.length==0){
              this.organization.phones[0] = '';
            }
            this.organization_state = response.data.state;
            this.organization_relationship_managers = response.data.relationship_managers;
            this.populateFiles(this.organization.id);
            this.setOwnerStatus();
          })
          .catch(e=>{console.log(e)});
      this.add_note_dlg = false;
      this.contact_note_dlg = false;
      this.op_action_dlg = false;
    },
    populateCounties(){
      CountyDataService.getAll()
          .then(response=>{
            this.all_counties = response.data.map(county=>{
              return county.name
            });
            this.unmapped_counties = response.data;
          })
          .catch(e=>{console.log(e)});
    },
    populateLinesOfBusiness(){
      LineOfBusinessDataService.getAll()
          .then(response=>{
            this.all_lines_of_business = response.data.map(lob=>{
              return lob.name
            });
            this.unmapped_lines_of_business = response.data;
          })
          .catch(e=>{console.log(e)});
    },
    populateArcRelationships(){
      ArcRelationshipDataService.getAll()
          .then(response=>{
            this.all_arc_relationships = response.data.map(arcrel=>{
              return arcrel.name
            });
            this.unmapped_arc_relationships = response.data;
          })
          .catch(e=>{console.log(e)});
    },
    populateAgencyTypes(){
      AgencyTypeDataService.getAll()
          .then(response=>{
            this.all_agency_types = response.data.map(agtype=>{
              return agtype.name
            });
            this.unmapped_agency_types = response.data;
          })
          .catch(e=>{console.log(e)});
    },
    setPOC(res){
      if(res.data.length == 0){
        this.openDialog('Add POC');
      }else{
        this.organization_points_of_contact = res.data;
      }
    },
    populateRelationshipManagersList(){
      UserDataService.getAll()
          .then(response=>{
            this.all_relationship_managers = response.data.map(manager=>{
              return {
                name: manager.first_name+" "+manager.last_name,
                value: manager.id
              }
            });
          })
          .catch(e=>{console.log(e)});
    },
    updateSelectedManager(obj){
      this.updated_relationship_manager = {
        value: obj.value
      };
    },
    addRelationshipManager(data){
      this.showRMDialog = false;
      data.organizationId = this.organization.id;

      RelationshipManagerDataService.create(data)
          .then(response=>{
            this.organization.relationship_managers = response.data;
            this.setOrganization();
          })
          .catch(err=>{console.log(err)});
    },
    updateRelationshipManager(data, id){
      this.showRMDialog = false;
      data.organizationId = this.organization.id;

      RelationshipManagerDataService.update(this.organization.id, id, data)
          .then(response => {
            this.organization.relationship_managers = response.data;
            this.setOrganization();
          })
          .catch(e => {
            console.log(e)
          });
    },
    deleteRelationshipManager(id){
      this.showRMDialog = false;
      RelationshipManagerDataService.delete(this.organization.id, id)
          .then(
              response=>{
                this.setOrganization();
              })
          .catch(e=>{console.log(e)});
    },
    updateContactInfo(primary, data, service, contactId = 0){
      data.isPrimary = primary;
      if(contactId != 0){
        service.update(contactId, data)
            .then(response=>{this.setOrganization();})
            .catch(e=>{console.log(e)});
      }else{
        service.create(data)
            .then(response=>{this.setOrganization();})
            .catch(e=>{console.log(e)});
      }
    },
    deletePOC(id){
      PersonDataService.get(id)
          .then(response=>{
            let person = response.data;
            person.phones.forEach(
                phone=>{
                  PhoneDataService
                      .delete(phone.id)
                      .catch(e=>{console.log(e)});
                });

            person.emails.forEach(
                email=>{
                  EmailDataService
                      .delete(email.id)
                      .catch(e=>{console.log(e)})});
            return person.id;
          }).then(id=>{
        console.log("called");
        PersonDataService.delete(id).catch(e=>{console.log(e)});
        this.setOrganization();
      })
          .catch(e=>{console.log(e)});
    },
    updatePOC(id, data){
      PersonDataService.get(id)
          .then(response=>{
            let person = response.data;
            let phoneData = {};
            if(data.primary_phone){
              phoneData = {
                number: data.primary_phone,
              }
              let primaryId = person.phones.filter(phone=>{
                return phone.isPrimary;
              });
              if(primaryId.length>0){
                this.updateContactInfo(true, phoneData, PhoneDataService, primaryId[0].id );
              }else{
                phoneData.personId = person.id;
                this.updateContactInfo(true, phoneData, PhoneDataService,);
              }
            }
            if(data.secondary_phone){
              phoneData = {
                number: data.secondary_phone,
              }
              let secondaryId = person.phones.filter(phone=>{
                return phone.isPrimary==false;
              });
              if(secondaryId.length>0){
                this.updateContactInfo(false, phoneData, PhoneDataService, secondaryId[0].id );
              }else{
                phoneData.personId = person.id;
                this.updateContactInfo(false, phoneData, PhoneDataService, );
              }
            }

            let emailData = {};
            if(data.primary_email){
              emailData = {
                address: data.primary_email,
              }
              let primaryId = person.emails.filter(email=>{
                return email.isPrimary;
              });
              if(primaryId.length>0){
                this.updateContactInfo(true, emailData, EmailDataService, primaryId[0].id );
              }else{
                emailData.personId = person.id;
                this.updateContactInfo(true, emailData, EmailDataService, );
              }
            }
            if(data.secondary_email){
              emailData = {
                address: data.secondary_email,
              }
              let secondaryId = person.emails.filter(email=>{
                return email.isPrimary==false;
              });
              if(secondaryId.length>0){
                this.updateContactInfo(false, emailData, EmailDataService, secondaryId[0].id );
              }else{
                emailData.personId = person.id;
                this.updateContactInfo(false, emailData, EmailDataService,  );
              }
            }

          })
          .catch(e=>{console.log(e)});
      /**
       * Update personal data
       */
      PersonDataService.update(id, data)
          .then()
          .catch(e=>{
            console.log(e)
          });
    },
    createPOC(data){
      PersonDataService.create(data)
          .then(response=>{
            let personId = response.data.id;
            let pocData = {
              personId: personId,
              organizationId: this.organization.id
            };
            if(data.primary_phone){
              let phoneData = {
                personId: personId,
                number: data.primary_phone,
                isPrimary: true
              };
              PhoneDataService.create(phoneData)
                  .then(pdresponse=>{console.log(pdresponse)})
                  .catch(e=>{console.log(e)});
            };
            if(data.secondary_phone) {
              let phoneData = {
                personId: personId,
                number: data.secondary_phone,
                isPrimary: false
              };
              PhoneDataService.create(phoneData)
                  .then(sdresponse=>{console.log(sdresponse)})
                  .catch(e=>{console.log(e)});
            }
            if(data.primary_email){
              let emailData = {
                personId: personId,
                address: data.primary_email,
                isPrimary: true
              };
              EmailDataService.create(emailData)
                  .then(emres=>{console.log(emres)})
                  .catch(e=>{console.log(e)});
            }
            if(data.secondary_email){
              let emailData = {
                personId: personId,
                address: data.secondary_email,
                isPrimary: false
              };
              EmailDataService.create(emailData)
                  .then(semailres=>{console.log(semailres)})
                  .catch(e=>{console.log(e)});
            }
            PointOfContactDataService.create(pocData)
                .then(response=>{
                  this.setOrganization();
                }).catch(e=>{console.log(e)});
          })
    },
    setEditContact(id){
      this.edit_contact_id = id;
    },
    populatePointOfContactList(){
      ContactDataService.getAll()
          .then(response=>{
            this.all_points_of_contact = response.data.map(person=>{
              return {
                name: person.first_name+" "+person.last_name,
                value: person.id
              }
            });
          })
          .catch(e=>{console.log(e)});
    },
    updateSelectedPointOfContact(obj){
      this.updated_point_of_contact = {
        value: obj.value
      };
    },
    addPointOfContact(){
      this.assign_poc_dlg = false;
      let organizationId = this.organization.id;

      let data = {
        organizationId: organizationId,
        personId: this.updated_point_of_contact.value
      };
      PointOfContactDataService.create(data)
          .then(response=>{
            this.setOrganization();
            // console.log(response);
          })
          .catch(err=>{console.log(err)});
    },
    updatePointOfContact(){
      this.assign_poc_dlg = false;

      let data = {

      };

      let personId = this.organization_points_of_contact[0].id;
      PersonDataService.update(personId, data)
          .then(response=>{
            this.setOrganization();
          }).catch(e=>{
            console.log(e)
          });
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    /**
     * Access
     */
    verifyAccess(type){
      switch(type){
        case 'read':
          if(this.permissions.includes('readAllOrgs')){
            return true;
          } else {
            return false;
          }
        case 'update':
          if(this.permissions.includes('editAllOrgs')){
            return true;
          }else if(this.permissions.includes('editOwnOrgs') && this.isOwner){
            return true;
          }else{
            return false;
          }
        case 'delete':
          if(this.permissions.includes('deleteAllOrgs')){
            return true;
          }else if(this.permissions.includes('deleteOwnOrgs') && this.isOwner){
            return true;
          }else{
            return false;
          }
        case 'reassign':
          return this.permissions.includes('reassignAccountOwner');
        default:
          return false;
      }
    },
    setPagePermissions(){
      let currentRole = this.$session.get("userRole");
      RoleDataService.get(currentRole)
          .then(response=>{
            this.permissions = response.data.permissions.map(permission=>{return permission.name});
          })
          .catch(e=>{console.log(e)});
    },
    setOwnerStatus(){
      let userId = this.$session.get("userID");
        UserDataService.getByUserId(userId)
          .then(response=>{
            let currUserId = response.data.person.id;
            let managerIds  = this.organization.relationship_managers.map(manager=>{
              return manager.person.id;
            });
            this.isOwner = managerIds.includes(currUserId);
          })
          .catch(e=> {console.log(e)});
    },
    setCurrentUser(){
      let userId = this.$session.get("userID");
      UserDataService.getByUserId(userId)
          .then(response=>{
            this.currentUserId = response.data.person.id;
          })
          .catch(e=> {console.log(e)});
    },
    /**
     * Form validation
     **/
    validate () {
      this.$refs.form.validate()
    },
  },
  computed:{
    headers () {
      let headers = [
        {text: 'File Name',value: 'name', width: '80px'},
        {text: 'Date', value: 'date', width: '80px'},
        {text: 'Author', value: 'author', width: '100px'},
        {text: '', value: 'download', width: '100px' },
        {text: '', value: 'remove', width: '100px'}
      ]
      return headers;
    }
  },
  mounted() {
    this.reset();
    this.setOrganization();
    this.populateRelationshipManagersList();
    this.populatePointOfContactList();
    this.populateCounties();
    this.populateLinesOfBusiness();
    this.populateArcRelationships();
    this.populateAgencyTypes();
    this.setPagePermissions();
    this.setCurrentUser();
  }
};
</script>



