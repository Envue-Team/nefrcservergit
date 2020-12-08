<template>
<v-container>
  <div class="red--text text--darken-2 page-title">Connections</div>
  <v-row>
      <v-col class="col-12 ">
        <v-row>
          <v-col>
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
            >
              <v-btn
                  text
                  color="red"
                  @click="add_organization_dlg=true"
              >
                Add New Organization
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-hover>
          </v-col>
        </v-row>
        <v-card outlined elevation="3 text-wrap">
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
        <v-row style="margin-top: -30px">
          <v-col class="col-2">
            <v-chip
                :input-value="filters.partners"
                @click="filters.partners = !filters.partners; filterOrganizations()"
                filter
                color="#66BB"
                pill
            >Partners</v-chip>
          </v-col>
          <v-col class="col-3" style="margin-left: -30px">
            <v-chip
                :input-value="filters.relationships"
                @click="filters.relationships = !filters.relationships; filterOrganizations()"
                filter
                color="deep-orange"
                pill
            >Relationships</v-chip>
          </v-col>
        </v-row>
<!--        <v-row>-->
<!--          <v-col class="col-5">-->
<!--          <v-chip-->
<!--                  :input-value="filters.public_safety"-->
<!--                  @click="filters.public_safety = !filters.public_safety; filterOrganizations()"-->
<!--                  filter color="green lighten-1"-->
<!--           >Public Safety</v-chip>-->
<!--            <v-chip-->
<!--                  :input-value="filters.my_assignments"-->
<!--                  @click="filters.my_assignments = !filters.my_assignments; filterOrganizations()"-->
<!--                  filter color="blue lighten-1"-->
<!--           >My Assignments</v-chip>-->
<!--          </v-col>-->
<!--        </v-row>-->
          <v-data-table
            :headers="headers"
            :search="search"
            :items="organizations"
            @click:row="nav"
            item-key="id"
            multi-sort
            class="text-capitalize"
            >
            <template v-slot:body.append="{ item }">
              <div class="row">
                <div class="col" style="margin-bottom: -25px; padding: 5px">
                  <JsonExcel
                      class="btn btn-default"
                      :data="excel_data"
                      :fields="excel_fields"
                      worksheet="My Worksheet"
                      name="filename.xls"
                  >
                    <v-btn
                      text
                      color="blue"
                    >
                      Download to Excel File
                    </v-btn>
                  </JsonExcel>
                </div>
                <div class="col-4">
                  <!---------------------------------Add Organization Dialog------------------------------->
                  <v-dialog
                      v-model="add_organization_dlg"
                      max-width="600px"
                  >
                    <v-card>
                      <v-form>
                        <v-card-title>
                          <span class="headline">Organization Information</span>
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
                                    v-model="add_organization.name"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <!-- <v-row>
                              <v-label>Relationship Status</v-label>
                              <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              >
                              <v-select
                              class="text-capitalize"
                              :items="status_options"
                              v-model="current_status">
                              </v-select>
                              </v-col>
                            </v-row> -->
                            <v-row>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    label="Street Number"
                                    v-model="add_organization.street_number"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    label="Street Name"
                                    v-model="add_organization.street_name"
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
                                    v-model="add_organization.city"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                    label="State"
                                    v-model="add_organization.state"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                    label="Zip"
                                    v-model="add_organization.zip"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                    label="County"
                                    v-model="add_organization.county"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                    label="Website"
                                    v-model="add_organization.website"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-row class="headline">Organization Type</v-row>
                                <v-row>
                                  <v-select
                                      label="Type"
                                      :items="organization_types"
                                      v-model="add_organization.type"
                                  ></v-select>
                                </v-row>
                                <v-row v-if="add_organization.type=='Relationship'">
                                  <v-select
                                      :items="relationship_statuses"
                                      v-model="add_organization.status"
                                      class="text-capitalize"
                                  ></v-select>
                                </v-row>
                                <span v-if="add_organization.type=='Partner'">
                                  <v-row>
                                    <v-text-field
                                        label="Services"
                                        v-model="add_organization.services"
                                    ></v-text-field>
                                  </v-row>
                                  <v-row>
                                    <v-text-field
                                        label="Critical Relationship Information"
                                        v-model="add_organization.critical_relationship_information"
                                    ></v-text-field>
                                  </v-row>
                                </span>
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
                              @click="add_organization_dlg=false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="addOrganization"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                  <!---------------------------------//Add Organization Dialog------------------------------>
                </div>
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              <span v-if="item.relationship !== null">
                <v-icon color="pink">mdi-hospital-box</v-icon>
                {{ item.name }}
              </span>
              <span v-else-if="item.partner!==null">
                <v-icon color="purple">mdi-hospital-box</v-icon>
                {{ item.name }}
              </span>
            </template>
            <template v-slot:item.address="{ item }">
              <address class="text-capitalize">
                {{ item.address }}
              </address>
          </template>
          <template v-slot:item.manager ="{ item }">
            {{ item.manager }}
          </template>
        </v-data-table>
          </v-card-text>
        </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import OrganizationDataService from "../services/OrganizationDataService";
import PartnerDataService from "../services/PartnerDataService";
import RelationshipDataService from "../services/RelationshipDataService";
import JsonExcel from "vue-json-excel";

export default {
  name: "organizations",
  components: {
    JsonExcel,
  },
    data() {
      return {
        excel_fields:{},
        excel_data:[],
        /**
         * Excel Download
         */
        json_meta: [
          [
            {
              key: "charset",
              value: "utf-8",
            },
          ],
        ],
        filters:{
          partners: true, 
          relationships: true,
          my_assignments: false
        },
        add_organization_dlg: false,
        search: '',
        organizations: [],
        orgCache: [],
        organization_types: ["Relationship", "Partner"],
        relationship_statuses: ["Hot", "Warm", "Cold"],
        add_organization: {
          name: '',
          street_number: '',
          street_name: '',
          city: '', 
          state: '', 
          zip: '',
          county: '',
          website: '',
          poc: {
            phone: '',
            email:''
          },
          type:'',
          critical_relationship_information: '', 
          services: '', 
          status: ''
        }
      };
    },
   computed: {
      headers () {
        let headers = [
          {text: 'Name',value: 'name'},
          {text: 'Address', value: 'address'},
          {text: 'County', value: 'county' },
          {text: 'Manager', value: 'manager'},
          {text: '', value:''}
        ]
        if(this.filters.partners){
          headers.push({text: "Services", value:'partner.services'});
        }
        if(this.filters.relationships){
          headers.push({text: "Status",value:'relationship.status'});
        }
        headers.forEach(header=>{
          headers.forEach(header =>{
            this.excel_fields[header.text] = header.text.toLowerCase();
          });
        });
        return headers;
      },
    },
    methods: {
      updateExcelFields(){
        this.headers.forEach(header=>{
          this.excel_fields[header.text] = header.text.toLocaleLowerCase();
        });
      },
      nav(item){
        if(item.partner !== null){
          this.$router.push({ path: "partner/"+item.id});
        }else if(item.relationship != null){
          this.$router.push({ path: "relationship/"+item.id});
        }
      },
      addOrganization(){
          let data = {
            "name": this.add_organization.name,
            "street_number": this.add_organization.street_number,
            "street_name": this.add_organization.street_name,
            "city": this.add_organization.city,
            "state":this.add_organization.state,
            "zip":this.add_organization.zip,
            "website":this.add_organization.website
          };
        if(this.add_organization.type=='Partner'){
          data.services = this.add_organization.services;
          data.critical_relationship_information = this.add_organization.critical_relationship_information;
          PartnerDataService.create(data).
          then(response=>{
            this.retrieveOrganizations();
            this.add_organization_dlg = false
          })
          .catch(e=>{
            console.log(e);
          });
        }else if (this.add_organization.type=='Relationship'){
          data.status = this.add_organization.status;
          RelationshipDataService.create(data).
          then(response=>{
            console.log(response);
            this.retrieveOrganizations();
            this.add_organization_dlg = false
          })
          .catch(e=>{
            console.log(e)
          });
        }

      },
      retrieveOrganizations() {
        OrganizationDataService.getAll()
          .then(response => {
            this.orgCache = response.data;
            this.orgCache.forEach(organization=>{
              if(organization.relationship_managers !== null && organization.relationship_managers.length !== 0){
                organization.address = organization.street_number+" "+organization.street_name+"\n"+
                organization.city+", "+organization.state+" "+organization.zip;
                let manager = organization.relationship_managers[0].person;
                let manager_data = manager.first_name+" "+manager.last_name;
                organization.manager = manager_data;
                let phones = '';
                manager.phones.forEach(phone=>{
                  phones += phone.number+" \n"
                });
                let emails = '';
                 manager.emails.forEach(email=>{
                  emails += email.address+" \n"
                });
                organization.manager = manager_data +"\n"+ phones+"\n"+emails;
                organization.managerId = manager.id;
              }else{
                organization.manager = "Not yet assigned";
                organization.managerId = 0;
              }

              if( organization.partner !== null ){
                organization.services = organization.partner.services;
              }else if( organization.relationship !== null ){
                organization.status = organization.relationship.status;
              }
              this.excel_data = this.organizations;
            });
            
            this.organizations = response.data;

            this.organizations.forEach(organization=>{
              organization.address = organization.street_number+" "+organization.street_name+"\n"+
                    organization.city+", "+organization.state+" "+organization.zip;
              if(organization.relationship_managers !== null && organization.relationship_managers.length !== 0){
                let manager = organization.relationship_managers[0].person;
                let manager_data = manager.first_name+" "+manager.last_name;
                let phones = '';
                manager.phones.forEach(phone=>{
                  phones += phone.number+" \n"
                });
                let emails = '';
                 manager.emails.forEach(email=>{
                  emails += email.address+" \n"
                });
                organization.manager = manager_data +"\n"+ phones+"\n"+emails;
                organization.managerId = manager.id;
              }else{
                organization.manager = "Not yet assigned";
                organization.managerId = 0;
              }

              if( organization.partner !== null ){
                organization.services = organization.partner.services;
              }else if( organization.relationship !== null ){
                organization.status = organization.relationship.status;
              }
              this.excel_data = this.organizations;
          });
          })
          .catch(e => {
            console.log(e.message);
          });

      },
      filterOrganizations(){
        this.organizations = this.orgCache.filter(organization=>{
          var assign = this.filters['my_assignments'] ? organization.managerId == "5693164c-5da4-4d07-ad24-d9f39befc823" : true;
          return (this.filters['partners'] && organization.partner !== null && assign) | 
          (this.filters['relationships'] && organization.relationship !== null && assign)
        });
        this.updateExcelFields();
      }
    },
    mounted() {
      this.retrieveOrganizations();
    }
};
</script>
