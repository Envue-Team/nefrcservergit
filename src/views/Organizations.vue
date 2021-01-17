<template>
<v-container>
  <div class="red--text text--darken-2 page-title">Connections</div>
  <v-row>
      <v-col class="col-12 ">
        <v-row v-show="verifyAccess('create')">
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
              <div class="row" style="padding-bottom: 20px">
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
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              {{ item.name }}
            </template>
            <template v-slot:item.address="{ item }">
              <address class="text-capitalize">
                {{ item.address }}
              </address>
          </template>
          <template v-slot:item.county="{ item }">
            {{ item.counties }}
          </template>
          <template v-slot:item.manager ="{ item }">
            {{ item.manager }}
          </template>
        </v-data-table>
          </v-card-text>
        </v-card>
    </v-col>
  </v-row>
  <v-dialog
      v-model="add_organization_dlg"
      max-width="1200px"
  >
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card-title>
          <span class="headline">Add Organization</span>
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
                    label="*Agency Name"
                    v-model="add_organization.name"
                    required
                    :rules="businessNameRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="*Street Number*"
                    v-model="add_organization.street_number"
                    required
                    :rules="streetNumberRule"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="*Street Name"
                    v-model="add_organization.street_name"
                    required
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
                    label="*City"
                    v-model="add_organization.city"
                    required
                    :rules="streetNameRule"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                    required
                    :items="states"
                    v-model="add_organization.state"
                    label="*State"
                    :rules="stateRule"
                >
                </v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                    label="*Zip"
                    v-model="add_organization.zip"
                    required
                    :rules="zipRule"
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
              <v-col cols="6">
                <v-text-field
                    label="Phone Number"
                    v-model="add_organization.phone"
                    :rules="businessPhoneRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                    multiple
                    required
                    :items="all_counties"
                    v-model="add_organization.county"
                    :rules="countyRule"
                    label="*Counties"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                    :items="mou_options"
                    v-model="add_organization.mou"
                    required
                    label="*National DCS MOU Partner?"
                    :rules="mouRule"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                    multiple
                    required
                    :items="all_lines_of_business"
                    v-model="add_organization.line_of_business"
                    :rules="lobRule"
                    label="*Line of Business"
                >
                </v-select>
              </v-col>
              <v-col>
                <v-select
                    multiple
                    required
                    :items="all_arc_relationships"
                    v-model="add_organization.arc_relationship"
                    :rules="arcFunctionRule"
                    label="*Arc Relationships"
                >
                </v-select>
              </v-col>
              <v-col>
                <v-select
                    multiple
                    required
                    :items="all_agency_types"
                    v-model="add_organization.agency_type"
                    :rules="agencyRule"
                    label="*Agency Types"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea
                  label="Organization Contact Protocol"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-textarea
                  label="*Services"
                  :rules="serviceDescriptionRule"
              ></v-textarea>
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
              :disabled="!valid"
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
  </v-container>
</template>

<script>
import OrganizationDataService from "../services/OrganizationDataService";
import JsonExcel from "vue-json-excel";
import CountyDataService from "@/services/CountyDataService";
import LineOfBusinessDataService from "@/services/LineOfBusinessDataService";
import ArcRelationshipDataService from "@/services/ArcRelationshipDataService";
import AgencyTypeDataService from "@/services/AgencyTypeDataService";
import PhoneDataService from "@/services/PhoneDataService";
import OrganizationCountyDataService from "@/services/OrganizationCountyDataService";
import OrganizationLineOfBusinessDataService from "@/services/OrganizationLineOfBusinessDataService";
import OrganizationArcRelationshipDataService from "@/services/OrganizationArcRelationshipDataService";
import OrganizationAgencyTypeDataService from "@/services/OrganizationAgencyTypeDataService";
import RoleDataService from "@/services/RoleDataService";

export default {
  name: "organizations",
  components: {
    JsonExcel,
  },
    data() {
      return {
        isOwner: false,
        permissions: [],

        /**
         * Form validation
         **/
        valid: false,
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
        phoneRule:[
            v => !!v || 'Phone number is required',
            v => /^(1-)?\d{3}-\d{3}-\d{4}$/.test(v) || 'Please, input a valid phone number with format XXX-XXX-XXXX'
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
        excel_fields:{},
        excel_data:[],

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
          partners: false,
          relationships: true,
          my_assignments: false
        },
        add_organization_dlg: false,
        search: '',
        organizations: [],
        orgCache: [],
        organization_types: ["Relationship", "Partner"],
        relationship_statuses: ["Hot", "Warm", "Cold"],
        add_organization:{
          "name": '',
          "street_number": '',
          "street_name": '',
          "city": '',
          "state": '',
          "zip": '',
          "county": '',
          "website": '',
          "mou": '',
          "contact_protocol": '',
          "last_contact": '',
          "service": '',
          "notes": '',
          "action": '',
          "phone": '',
          "line_of_business":'',
          "agency_type":'',
          "arc_relationship":''

        },
          type:'',
          critical_relationship_information: '', 
          services: '', 
          status: ''
        // }
      }
    },
   computed: {
      headers () {
        let headers = [
          {text: 'Name',value: 'name'},
          {text: 'Address', value: 'address'},
          {text: 'City', value: 'city'},
          {text: 'Zip', value: 'zip'},
          {text: 'County', value: 'county_display' },
          {text: 'Manager', value: 'manager'},
          {text: '', value:''}
        ]
        if(this.filters.partners){
          headers.push({text: "Services", value:'partner.services'});
        }
        // if(this.filters.relationships){
        //   headers.push({text: "Status",value:'relationship.status'});
        // }
        headers.forEach(header=>{
          headers.forEach(header =>{
            this.excel_fields[header.text] = header.text.toLowerCase();
          });
        });
        return headers;
      },
    },
    methods: {
      /**
       * Files
       **/
      updateExcelFields(){
        this.headers.forEach(header=>{
          this.excel_fields[header.text] = header.text.toLocaleLowerCase();
        });
      },

      /**
       * Form validation
       **/
      validate () {
        this.$refs.form.validate()
      },

      nav(item){
        this.$router.push({path: "organization/"+item.id});
      },

      addOrganization(){
          let data = {
              "name": this.add_organization.name,
              "street_number": this.add_organization.street_number,
              "street_name": this.add_organization.street_name,
              "city": this.add_organization.city,
              "state": this.add_organization.state,
              "zip": this.add_organization.zip,
              // "county": this.add_organization.county,
              "website": this.add_organization.website,
              "mou": this.add_organization.mou,
              "contact_protocol": this.add_organization.contact_protocol,
              "last_contact": this.add_organization.last_contact,
              "service": this.add_organization.service,
              "notes": this.add_organization.notes,
              "action": this.add_organization.action
          };
          OrganizationDataService.create(data)
              .then(response=>{
                let id = response.data.id;

                //Update phone
                PhoneDataService.create({
                  organizationId: id,
                  number: this.add_organization.phone,
                  isPrimary: true
                }).catch(e=>{console.log(e)});

                //Update counties
                this.add_organization.county.forEach(county=>{
                  this.unmapped_counties.filter(ucounty => {
                    if(ucounty.name == county){
                      OrganizationCountyDataService.create({
                        organizationId: id,
                        countyId: ucounty.id
                      }).then().catch(e=>{console.log(e)});
                    }
                  })
                });

                //Update line of business
                this.add_organization.line_of_business.forEach(lob=>{
                  this.unmapped_lines_of_business.filter(ulob=>{
                    if(ulob.name == lob){
                      OrganizationLineOfBusinessDataService.create({
                        organizationId: id,
                        lineOfBusinessId: ulob.id
                      }).then().catch(e=>{console.log(e)});
                    }
                  });
                });

                //Update arc relationship
                this.add_organization.arc_relationship.forEach(rel=>{
                  this.unmapped_arc_relationships.filter(urel=>{
                    if(urel.name == rel){
                      OrganizationArcRelationshipDataService.create({
                        organizationId: id,
                        arcRelationshipId: urel.id
                      }).then().catch(e=>{console.log(e)});
                    }
                  });
                });

                //Update agency data
                this.add_organization.agency_type.forEach(type=>{
                  this.unmapped_agency_types.filter(utype=>{
                    if(utype.name == type){
                      OrganizationAgencyTypeDataService.create({
                        organizationId: id,
                        agencyTypeId: utype.id
                      });
                    }
                  })
                });
              })
              .catch(e=> {
            console.log(e)
          });
          this.add_organization_dlg = false;
          this.retrieveOrganizations();
      },
      retrieveOrganizations() {
        OrganizationDataService.getAll()
          .then(response => {
            this.orgCache = response.data;
            console.log(this.orgCache);
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
              organization.county_display = '';
              organization.counties.forEach(county=>{
                organization.county_display += county.name + ", ";
              });
              organization.county_display = organization.county_display
                  .substr(0,organization.county_display.length-2);
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
      filterOrganizations(){
        this.organizations = this.orgCache.filter(organization=>{
          var assign = this.filters['my_assignments'] ? organization.managerId == "5693164c-5da4-4d07-ad24-d9f39befc823" : true;
          return (this.filters['partners'] && organization.partner !== null && assign) | 
          (this.filters['relationships'] && organization.relationship !== null && assign)
        });
        this.updateExcelFields();
      },
      /**
       * Access
       */
      verifyAccess(type){
        switch(type){
          case 'create':
            if(this.permissions.includes('createOrgs')){
              return true;
            } else {
              return false;
            }
            break;
          default:
            return false;
        }
      },
      setPagePermissions(){
        let currentRole = this.$session.get("userRole");
        RoleDataService.get(currentRole)
            .then(response=>{
              this.permissions = response.data.permissions.map(permission=>{return permission.name});
              console.log(this.permissions);
            })
            .catch(e=>{console.log(e)});
      },
    },
    mounted() {
      this.retrieveOrganizations();
      this.populateCounties();
      this.populateArcRelationships();
      this.populateLinesOfBusiness();
      this.populateAgencyTypes();
      this.setPagePermissions();
    }
};
</script>
