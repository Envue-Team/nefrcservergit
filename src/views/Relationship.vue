<template>
	<v-container>
		<v-row><!---------------------First Container Row-------------------------------->
					
				<v-col class="col-7"><!----------------------Left Column-------------------------->
						<!---------------------Relationship Basic Data-------------------------------->
						<div class="text-h3 font-weight-thin">{{relationship.name}}

              <!---------------------------------Edit Relationship Dialog------------------------------->
							<v-dialog
							v-model="relationship_edit_dlg"
							max-width="600px"
							>
							<template v-slot:activator="{ on, attrs }">
                <v-hover
                  v-slot="{ hover }"
                  open-delay="200"
                >
                  <v-btn
                    icon
                    :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </v-hover>
							</template>
							<v-card>
								<v-form>
                  <v-card-title>
                    <span class="headline">Relationship Information</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                        cols="6"
                        sm="6"
                        md="6"
                        >
                          <v-text-field
                          label="Agency Name*"
                          required
                          v-model="relationship.name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                        cols="3"
                        sm="3"
                        md="3"
                        >
                          <v-select
                          label="Status"
                          class="text-capitalize"
                          :items="status_options"
                          v-model="current_status">
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                        <v-text-field
                        label="Street Number"
                        v-model="relationship.street_number"
                        ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                          label="Street Name"
                          v-model="relationship.street_name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="3"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                          label="City"
                          v-model="relationship.city"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                          label="State"
                          v-model="relationship.state"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                          label="Zip"
                          v-model="relationship.zip"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                          label="County"
                          v-model="relationship.county"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                          label="Website"
                          v-model="relationship.website"
                          ></v-text-field>
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
                      @click="relationship_edit_dlg=false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateRelationship"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
								</v-form>
							</v-card>
							</v-dialog>
						<!---------------------------------//Edit Relationship Dialog------------------------------>
						</div>
            <!------------------------------------Relationship Address Info------------------------------>
						<div class="body-3 mt-3 text-capitalize">
							{{ relationship.street_number }} {{ relationship.street_name}}<br>
							{{ relationship.city }}, {{ relationship.state }} {{ relationship.zip }}<br>
							{{relationship.county}} County
						</div>
						<a :href="relationship.website" class="blue--text text--darken-1 body-3 mt-3">{{ relationship.website }}</a>
						<!---------------------//Relationship Basic Data-------------------------------->

						<!--------------------------Partner Services-------------------------------->
<!--						<div class="text-h5 mt-3">Services<span v-if="relationship.public_safety"> (Safety) </span></div>-->
<!--						<div class="text-h5 font-weight-light">{{ relationship_secondary_info.services }}</div>-->
						<!------------------------//Partner Services--------------------------------->

						<!-----------------------Point of Contact--------------------------------->
						<div v-for="contact in organization_points_of_contact" v-bind:key="contact.personId" class="mt-3">
							<div class="text-h5 font-weight-light">
								<span :ref="'first_name_' + contact.personId">{{ contact.first_name }} </span>
								<span :ref="'last_name_' + contact.personId">{{ contact.last_name }} </span>
                  <!---------------------------------Assign Point of Contact Dialog------------------------------->
                  <v-dialog
                      v-model="assign_poc_dlg"
                      max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-hover
                          v-slot="{ hover }"
                          open-delay="200"
                      >
                        <v-btn
                            icon
                            :elevation="hover ? 16 : 2"
                            :class="{ 'on-hover': hover }"
                            v-bind="attrs"
                            v-on="on"
                        >
                          <v-icon>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </v-hover>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Assign Point of Contact</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                              <v-autocomplete
                                  :items="all_points_of_contact"
                                  item-text="name"
                                  item-value="value"
                                  return-object
                                  @change="updateSelectedPointOfContact"
                              >
                              </v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="assign_poc_dlg=false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            v-on:click="updatePointOfContact"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!---------------------------------//Assign Point of Contact Dialog------------------------------>
              </div>
							<div v-for="phone in contact.phones" :key="phone.number" class="text-h5 font-weight-thin">
								<span :ref="'phone_' + phone.id">{{ phone.number }}</span>
							</div>
							<div v-for="email in contact.emails" :key="email.address" class="text-h5 font-weight-thin">
								<span :ref="'email_' + email.id">{{ email.address }}</span>
							</div>
						</div>	
						<!-----------------------//Point of Contact--------------------------------->

						<!--------------------------Relationship Management-------------------------------->
            <div v-if="organization_relationship_managers.length == 0">
              <!---------------------------------Assign Relationship Manager Dialog------------------------------->
              <v-dialog
                  v-model="assign_mgr_dlg"
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-hover
                      v-slot="{ hover }"
                      open-delay="200"
                  >
                    <v-btn
                        icon
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </v-hover>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Assign Relationship Manager</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                          <v-autocomplete
                              label="Relationship Manager"
                              :items="all_relationship_managers"
                              item-text="name"
                              item-value="value"
                              return-object
                              @change="updateSelectedManager"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="assign_mgr_dlg=false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        v-on:click="updateRelationshipManager"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!---------------------------------//Assign Relationship Manager Dialog------------------------------>
            </div>
						<div v-for="manager in organization_relationship_managers" v-bind:key="manager.id">
							<div class="text-h5 font-weight-light mt-3">
								<span :ref="'relationship_manager_' + manager.personId">
									{{ manager.person.first_name }} {{ manager.person.last_name }} (Relationship Manager)
								</span>
							<!---------------------------------Assign Relationship Manager Dialog------------------------------->
							<v-dialog
							v-model="assign_mgr_dlg"
							max-width="600px"
							>
							<template v-slot:activator="{ on, attrs }">
							<v-hover
								v-slot="{ hover }"
								open-delay="200"
							>
							<v-btn
								icon
								:elevation="hover ? 16 : 2"
								:class="{ 'on-hover': hover }"
								v-bind="attrs"
								v-on="on"
							>
							<v-icon>
								mdi-pencil
							</v-icon>
							</v-btn>
							</v-hover>
							</template>
							<v-card>
								<v-card-title>
								<span class="headline">Assign Relationship Manager</span>
								</v-card-title>
								<v-card-text>
								<v-container>
									<v-row>
										<v-col
										cols="12"
										sm="12"
										md="12"
										>
											<v-autocomplete
											label="Relationship Manager"
											:items="all_relationship_managers"
											item-text="name"
											item-value="value"
											return-object
											@change="updateSelectedManager"
											>
											</v-autocomplete>
										</v-col>	
									</v-row>
								</v-container>
								</v-card-text>
								<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="blue darken-1"
									text
									@click="assign_mgr_dlg=false"
								>
									Close
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									v-on:click="updateRelationshipManager"
								>
									Save
								</v-btn>
								</v-card-actions>
							</v-card>
							</v-dialog>
						<!---------------------------------//Assign Manager Dialog------------------------------> 

						</div>
							<div v-for="mphone in manager.person.phones" :key="mphone.number" class="text-h5 font-weight-thin">{{ mphone.number }}</div>
							<div v-for="memail in manager.person.emails" :key="memail.address" class="text-h5 font-weight-thin"> {{ memail.address }}</div>
						</div>
						<!--------------------------//Relationship Management-------------------------------->
						
						<!--------------------------File List Table-------------------------------->
<!--						<v-data-table-->
<!--						:headers="headers"-->
<!--						:search="search"-->
<!--						:items="files"-->
<!--						item-key="id"-->
<!--						multi-sort-->
<!--						>-->
<!--						<template v-slot:top>-->
<!--						<v-text-field-->
<!--						v-model="search"-->
<!--						label="Search Files"-->
<!--						class="mx-4"-->
<!--						></v-text-field>-->
<!--						</template>-->
<!--						<template v-slot:item.name="item">-->
<!--							<p>{{ item.item.name  }}</p>-->
<!--						</template>-->
<!--						<template v-slot:item.date="item">-->
<!--							<p>{{ item.item.date }}</p>-->
<!--						</template>-->
<!--						<template v-slot:item.author="item">-->
<!--							<p>{{ item.item.author }}</p>-->
<!--						</template>-->
<!--						<template v-slot:item.download="item">-->
<!--							<v-btn-->
<!--								depressed-->
<!--								small-->
<!--								@click="downloadFile(item)"-->
<!--							>-->
<!--							Download-->
<!--							<v-icon-->
<!--								color="orange darken-4"-->
<!--								right-->
<!--							>-->
<!--								mdi-arrow-down-->
<!--							</v-icon>-->
<!--							</v-btn>-->
<!--						</template>-->
<!--						<template v-slot:item.remove="item">-->
<!--							<v-btn-->
<!--								depressed-->
<!--								small-->
<!--								@click="deleteFile(item)"-->
<!--							>-->
<!--							<v-icon-->
<!--								color="orange darken-4"-->
<!--								right-->
<!--							>-->
<!--								mdi-trash-can-->
<!--							</v-icon>-->
<!--							</v-btn>-->
<!--						</template>-->
<!--						<template v-slot:footer>-->
<!--							<v-row>-->
<!--							<v-file-input-->
<!--							label="Upload new file"-->
<!--							show-size-->
<!--							counter-->
<!--							dense-->
<!--							@change="filesChange"-->
<!--							></v-file-input>-->
<!--							<v-btn-->
<!--								depressed-->
<!--								small-->
<!--								:disabled="upload_disabled"-->
<!--								@click="uploadFile"-->
<!--							>-->
<!--							Upload-->
<!--							<v-icon-->
<!--								color="orange darken-4"-->
<!--								right-->
<!--							>-->
<!--								mdi-arrow-up-->
<!--							</v-icon>-->
<!--							</v-btn>-->
<!--							</v-row>-->
<!--						</template>-->
<!--						</v-data-table>-->
						<!--------------------------//File List Table-------------------------------->

				</v-col><!----------------------//Left Column-------------------------->

				<v-col><!---------------------------Right Column-------------------------------------->
					<NoteDialog v-model="showNoteDialog" :item="view_note_item"/>
					<!--------------------------Notes and History-------------------------------->
					<template>
						<v-card
							class="mx-auto"
						>
							<v-card-title class="white--text orange darken-4">
							Notes:

							<v-spacer></v-spacer>
							<!---------------------------------Add Note Dialog------------------------------->
							<v-dialog
							v-model="add_note_dlg"
							max-width="600px"
							>
							<template v-slot:activator="{ on, attrs }">
							<v-hover
								v-slot="{ hover }"
								open-delay="200"
							>
							<v-btn
								color="white"
								class="text--primary"
								fab
								small
								:elevation="hover ? 16 : 2"
								:class="{ 'on-hover': hover }"
								v-bind="attrs"
								v-on="on"
							>
							<v-icon>
								mdi-plus
							</v-icon>
							</v-btn>
							</v-hover>
							</template>
							<v-form
								v-model="valid_note"
								ref="new_note_form"
							>
								<v-card>
									<v-card-title>
									<span class="headline">Note</span>
									</v-card-title>
									<v-card-text>
									<v-container>
										<v-row>
											<v-col class="col-3">
												<v-autocomplete
												:items="add_note_form.types"
												v-model="add_note_form.type"
												label="Type"
												></v-autocomplete>											
											</v-col>
										</v-row>
										<v-row>
											<v-col
											cols="12"
											sm="12"
											md="12"
											>
												<v-textarea
													:rules="note_text_rule"
													v-model="add_note_form.text"
												></v-textarea>
											</v-col>	
										</v-row>
									</v-container>
									</v-card-text>
									<v-card-actions>
									<v-spacer></v-spacer>
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
										@click="addNote"
									>
										Save
									</v-btn>
									</v-card-actions>
								</v-card>
								</v-form>
							</v-dialog>
							<!---------------------------------//Add Note Dialog------------------------------> 
							
							</v-card-title>

							<v-card-text class="pt-4">
							<v-card-title>Relationship History</v-card-title>
								<v-divider></v-divider>
								<v-row>
									<v-col>
										<v-text-field
												placeholder="Search"
												v-model="note_search"
												append-icon="mdi-magnify"
										></v-text-field>
									</v-col>
									<v-col>
										<v-switch
										v-model="history_switch"
										:label="switch_label()"
										color="red"
										hide-details
										@change="set_notes_view"
										></v-switch>
									</v-col>
								</v-row>
								<v-row>
									<v-col
									cols="12"
									sm="6"
									md="4"
									>
									<v-menu
										v-model="menu1"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="formattedStartDate"
											label="Start Date"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											clearable
										></v-text-field>
										</template>
										<v-date-picker
										v-model="start_date"
										@input="menu1 = false"
										></v-date-picker>
									</v-menu>
									</v-col>
									<v-col
									cols="12"
									sm="6"
									md="4"
									>
									<v-menu
										v-model="menu2"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
											<!---------v-model="end_date"---------------->
										<v-text-field
											v-model="formattedEndDate"
											label="End Date"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											clearable
										></v-text-field>
										</template>
										<v-date-picker
										v-model="end_date"
										@input="menu2 = false"
										></v-date-picker>
									</v-menu>
									</v-col>
									<v-spacer></v-spacer>
								</v-row>
							</v-card-text>
							

							<v-divider></v-divider>
							<v-virtual-scroll
							:items="filteredList"
							:item-height="50"
							height="300"
							>
							<template v-slot:default="{ item }">
								<v-list-item>
									
								<v-list-item-content>
									<v-list-item-title class="font-weight-thin">
										Author: {{ item.author.first_name }} {{ item.author.last_name }} - {{ item.date }}
									</v-list-item-title>
									<v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-action>
									<!-------------------------------New Note Dialog------------------------------>
									<v-btn
										depressed
										small
										@click.stop="openNoteDialog(item)"
									>
										Open
									<v-icon
										color="orange darken-4"
										right
									>
										mdi-open-in-new
									</v-icon>
									</v-btn>
								</v-list-item-action>
								</v-list-item>
							</template>
							</v-virtual-scroll>
						</v-card>
						</template>
						<!--------------------------//Notes and History-------------------------------->	

				</v-col><!-----------------------------//Right Column---------------------------------->

		</v-row><!---------------------//First Container Row-------------------------------->
	</v-container>
</template>
<script>

import PartnerDataService from "@/services/PartnerDataService";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

import RelationshipDataService from "../services/RelationshipDataService";
import PersonDataService from "../services/PersonDataService";
import RelationshipManagerDataService from "../services/RelationshipManagerDataService";
import PhoneDataService from "../services/PhoneDataService";
import NoteDataService from "../services/NoteDataService";
import FileDataService from "../services/FileDataService";
import NoteDialog from "./NoteDialog";
import EmailDataService from "@/services/EmailDataService";
import UserDataService from "@/services/UserDataService";
import ContactDataService from "@/services/ContactDataService";
import PointOfContactDataService from "@/services/PointOfContactDataService";

export default {
	name: "relationship",
	components: {
		NoteDialog
	},
	
	data() {
	return {

		/**
		 * Experimental
		 */
		showNoteDialog: false,

		/**
		 * Relationship
		 */
		relationship: '',
		relationship_edit_dlg: false,
		relationship_secondary_info: '',

		/**
		 * Relationship secondary info
		 */
		status_options: ["hot", "warm", "cold"],
		current_status: '',

		/**
		 * Relationship Mangers 
		 **/
		assign_mgr_dlg: false,
    updated_relationship_manager: '',
		all_relationship_managers:[],
		organization_relationship_managers: [],

    /**
     * Point of Contact
     **/
    assign_poc_dlg: false,
    updated_point_of_contact: '',
    all_points_of_contact:[],
    organization_points_of_contact: [],

		/**
		 * Files 
		 **/
		files: [],
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
		uploadFieldName: 'files',
		file_upload: '',
		upload_disabled: true,
		search: '',

		/**
		 * Notes
		 **/
		view_note_item: {},
		note_search: '',
		history_switch: true,
		notes: [],

		//Add Note
		add_note_dlg: false,
		valid_note: true,
		note_text_rule: [
			v => !!v || 'Text is required',
		],
		add_note_form: {
			types: ['General', 'Contact'],
			text: '',
			type: 'General'
		},

		//View Note
		view_note_dlg: false,
		notes_type_selected:{
			general: false,
			contact: true
		},

		//Date Pickers
		menu1: false,
		menu2: false,
		start_date: new Date().toISOString().substr(0, 10),
		// end_date: ''
		end_date: new Date().toISOString().substr(0, 10),
		formattedStartDate: '',
		formattedEndDate: ''
	}
},
    watch: {
      start_date (val) {
        this.formattedStartDate = this.formatDate(this.start_date)
	    },
      end_date (val){
        this.formattedEndDate = this.formatDate(this.end_date)
      }
    },
	methods: {
		/**
		 * Notes
		 */
		close_note_dlg(){
			this.view_note_dlg=false
		},
		openNoteDialog(item){
			this.showNoteDialog=true;
			this.view_note_item = item;
		},
		setModal(item){
			this.view_note_item = item;
			this.open_note_dlg();
		},
		switch_label(){
			return this.history_switch ? "Contact History" : "General History";
		},
		addNote(val){
			if(this.$refs.new_note_form.validate()){
				var data = {
					organizationId: this.relationship.id,
          //TODO: Set this id to current user
					personId: "5693164c-5da4-4d07-ad24-d9f39befc823",
					text: this.add_note_form.text,
					type: this.add_note_form.type.toLowerCase()
				};
				NoteDataService.create(data).then(response=>{
					this.setRelationship(this.relationship.id);
				})
				.catch(e=>{console.log(e)});
				this.add_note_form.text = '';
				this.add_note_dlg=false;
			}
		},
		deleteNote(val){
			NoteDataService.delete(val.id)
			.then(response=>{
				this.setRelationship(this.relationship.id);
			})
			.catch(e=>{
				console.log(e);
			});
			this.showNoteDialog=false;
		},
		set_notes_view(){
			this.notes_type_selected.general = !this.history_switch;
			this.notes_type_selected.contact = this.history_switch;
		},

		/**
		 * Files
		 */
		downloadFile(obj){
			var data = {
				fileId: obj.item.id
			}
			FileDataService.download(obj.item.filepath, data)
			.then(response=>{
				var fileURL = window.URL.createObjectURL(new Blob([response.data]));
				var fileLink = document.createElement('a');

				fileLink.href = fileURL;
				fileLink.setAttribute('download', 'file.pdf');
				document.body.appendChild(fileLink);
				
				fileLink.click();
			})
			.catch(e=>{console.log(e)});
		},
		deleteFile(obj){
			var data = {
				filePath: obj.item.filePath
			}
			FileDataService.delete(obj.item.id, data)
			.then(response=>{
				this.populateFiles(this.relationship.id);
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
			formData.append('organizationId', this.relationship.id);
			formData.append('personId',"5693164c-5da4-4d07-ad24-d9f39befc823" );
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
			this.populateFiles(this.relationship.id);
		},
		filesChange(files) {
			// handle file changes
			this.file_upload = files;
			this.upload_disabled = false;
		},
		populateFiles(id){
			FileDataService.getAll(id)
			.then(response=>{
				this.files = response.data.map(file=>{
					var date = Intl.DateTimeFormat('en-US').format(new Date(file.createdAt));
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
		/**
		 * Relationship
		 **/
		updateRelationship(){
			/*
			Update organization data
			*/
			this.relationship_edit_dlg = false;
			var data = {
				"name": this.relationship.name,
				"street_number": this.relationship.street_number,
				"street_name": this.relationship.street_name,
				"city": this.relationship.city,
				"state": this.relationship.state,
				"zip": this.relationship.zip,
				"county": this.relationship.county,
				"website": this.relationship.website,
				"public_safety": this.relationship.public_safety,
				"status": this.current_status
			}
			RelationshipDataService.update(this.relationship.id, data)
			.then(response=>{
				console.log(response.data);
			})
			.catch(e=>{
				console.log(e);
			});

			/*
			Update point of contact data
			*/
			this.relationship.point_of_contacts.forEach(contact=>{
				const person = {
					first_name: this.$refs["first_name_"+contact.personId][0]["innerHTML"],
					last_name: this.$refs["last_name_"+contact.personId][0]["innerHTML"],
				};
				ContactDataService.update(contact.personId, person).then(response=>{
					console.log(response.data);
				})
				.catch(e=>{console.log(e)});

				contact.person.phones.forEach(phone=>{
					const data = {
						number: this.$refs["phone_"+phone.id][0]["innerHTML"]
					};

					PhoneDataService.update(phone.id, data).then(response=>{
						// console.log(response)
					})
					.catch(e=>{console.log(e)});
				});
				
				contact.person.emails.forEach(email=>{
					const data = {
						number: this.$refs["email_"+email.id][0]["innerHTML"]
					};

					EmailDataService.update(email.id, data).then(response=>{
						// console.log(response)
					})
					.catch(e=>{console.log(e)});
				});
			});

			/*
			Update relationship manager for partner
			*/
			this.relationship.relationship_managers.forEach(manager=>{
				const data = {
					organizationId: manager.organizationId,
					personId: manager.personId
				}
				OrganizationManagerDataService.update(manager.organizationId, manager.personId, data)
			});
		},
		setRelationship(){
			RelationshipDataService.get(this.$route.params.organizationId)
			.then(response => {
				this.notes = response.data.notes.map(note=>{
					var date = Intl.DateTimeFormat('en-US').format(new Date(note.createdAt));
					return {
						id: note.id,
						text: note.text,
						date: date,
						author: note.person,
						type: note.type
					}
				});
        PointOfContactDataService.getAll(response.data.id)
            .then(this.setPOC)
            .catch(e=>{console.log(e)});
        this.relationship = response.data;
        this.organization_relationship_managers = response.data.relationship_managers;
        this.populateFiles(this.relationship.id);
        this.relationship_secondary_info = response.data.relationship;
        this.current_status = response.data.relationship.status;

				// console.log(this.relationship);
			})
			.catch(e => {
				console.log(e.message);
			});
		},
    setPOC(res){
      this.organization_points_of_contact = res.data;
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
    updateRelationshipManager(){
      this.assign_mgr_dlg = false;
      let organizationId = this.relationship.id;

      let data = {
        organizationId: organizationId,
        personId: this.updated_relationship_manager.value
      };

      if(this.relationship.relationship_managers.length != 0) {
        let personId = this.relationship.relationship_managers[0].personId;
        RelationshipManagerDataService.update(organizationId, personId, data)
            .then(response => {
              this.relationship.relations_managers = response.data;
              this.setRelationship();
            })
            .catch(e => {
              console.log(e)
            });
      }else {
        RelationshipManagerDataService.create(data)
            .then(response=>{
              RelationshipDataService.get(this.relationship.id)
                  .then(response => {
                    this.relationship = response.data;
                    this.organization_relationship_managers = response.data.relationship_managers;
                  }).catch(e => {
                console.log(e);
              });
              console.log(response);
            })
            .catch(err=>{console.log(err)});
      }
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
    updatePointOfContact(){
      this.assign_poc_dlg = false;
      let organizationId = this.relationship.id;

      let data = {
        organizationId: organizationId,
        personId: this.updated_point_of_contact.value
      };

      if(this.organization_points_of_contact != 0) {
        let personId = this.organization_points_of_contact[0].id;
        PointOfContactDataService.update(organizationId, personId, data)
            .then(response => {
              this.setRelationship();
              // console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
      }else {
        PointOfContactDataService.create(data)
            .then(response=>{
              console.log(response);
            })
            .catch(err=>{console.log(err)});
      }
    },
		updateRelationshipManagerLegacy(){
			this.assign_mgr_dlg = false;
			var organizationId = this.relationship.id;

			var data = {
				organizationId: organizationId,
				personId: obj.value
			};
			var personId = this.relationship.relationship_managers[0].personId;

			RelationshipManagerDataService.update(organizationId, personId, data)
			.then(response=>{
				RelationshipDataService.get(this.relationship.id)
				.then(response=>{
					this.relationship = response.data;
					this.organization_relationship_managers = response.data.relationship_managers;
				}).catch(e=>{console.log(e)});
			})
			.catch(e=>{console.log(e)});
		},
		formatDate (date) {
			if (!date) return null

			const [year, month, day] = date.split('-')
			return `${month}/${day}/${year}`
		  },
	},
	computed:{
		headers () {
			var headers = [
				{text: 'File Name',value: 'name', width: '80px'},
				{text: 'Date', value: 'date', width: '80px'},
				{text: 'Author', value: 'author', width: '100px'},
				{text: '', value: 'download', width: '100px' },
				{text: '', value: 'remove', width: '100px'}
			]
			return headers;
		},
		filteredList() {
        return this.notes.filter(note => {
					var afterStart = true;
					var beforeEnd = true;

					const vDate = new Date(note.date).toISOString().substr(0, 10);
					if(this.formattedStartDate !== '' && this.formattedStartDate !== null){
						afterStart = new Date(this.formattedStartDate).toISOString().substr(0, 10) < vDate;
					}
					if(this.formattedEndDate !== '' && this.formattedEndDate !== null){
						beforeEnd = new Date(this.formattedEndDate).toISOString().substr(0,10) > vDate;
					}

					if(this.notes_type_selected[note.type]){
						return (note.author.first_name.toLowerCase().includes(this.note_search.toLowerCase()) ||
						note.author.last_name.toLowerCase().includes(this.note_search.toLowerCase())) &&
						(afterStart && beforeEnd)
                    }
                })
            },		
	},
	mounted() {
		this.reset();
		//Update
		this.setRelationship();
		this.populateRelationshipManagersList();
		this.populatePointOfContactList();
	}
};
</script>

<style lang="sass" scoped>
.v-icon.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-icon__text
    color: #000
</style>