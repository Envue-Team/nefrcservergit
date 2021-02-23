<template>
  <v-container>
  <v-row>
      <v-col class="col-12">
        <span class="mobile-title hidden-md-and-up">Partners</span>
        <JsonExcel
            class="btn btn-default hidden-md-and-up"
            :data="excel_data"
            :fields="excel_fields"
            worksheet="My Worksheet"
            name="Partners.xls"
        >
          <v-btn
              elevation="3"
              fab
              color="#7F181B"
              small
              class="mr-3"
          >
            <v-icon
                class="mdi mdi-download"
                color="white"
            ></v-icon>
          </v-btn>
        </JsonExcel>
        <v-card
            class="pa-3 mt-md-8 mt-sm-3"
            outlined
            elevation="3 text-wrap"
            style="background-color: rgb(249, 249, 249)"
        >
          <v-card
              style="margin-top:-40px; width:100%;"
              class="pa-md-3 pa-sm-0 card-header-block hidden-md-and-down"
              rounded
          >
            <v-card-title class="card-header-title">Partners</v-card-title>
          </v-card>

        <v-card-text>
          <v-row>
            <v-btn
              fab
              elevation="3"
              small
              class="ml-3"
              v-show="verifyAccess('create')"
              color="white"
              @click="add_organization_dlg=true"
          >
            <v-icon class="mdi mdi-dark mdi-plus">
            </v-icon>
            </v-btn> <span
              v-show="verifyAccess('create')"
              class="pt-3 pl-2">Add New</span>
          </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-text-field
              class="shrink mt-3 mr-3 hidden-md-and-down"
              label="Search"
              v-model="search"
              append-icon="mdi-magnify"
          ></v-text-field>
          <v-text-field
              class="mt-3 mr-3 hidden-md-and-up"
              label="Search"
              v-model="search"
              append-icon="mdi-magnify"
          ></v-text-field>
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
              <div class="row hidden-md-and-down" style="padding-bottom: 20px">
                <div class="col" style="margin-bottom: -25px; margin-left: 20px; padding: 5px">
                  <JsonExcel
                      class="btn btn-default"
                      :data="excel_data"
                      :fields="excel_fields"
                      worksheet="ARC"
                      name="Partners.xls"
                  >
                    <v-btn
                      icon
                      fab
                      color="#7F181B"
                      large
                    >
                      <v-icon class="mdi mdi-download"></v-icon>
                    </v-btn>
                  </JsonExcel>
                </div>
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              <div>{{ item.name }}</div>
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
      max-width="700px"
  >
    <v-card>
      <v-form
          v-model="valid"
      >
        <v-card-title>
          <span class="headline">Add a New Organization</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="8"
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
                  cols="4"
                  sm="12"
                  md="4"
              >
                <v-text-field
                    label="*St Number"
                    v-model="add_organization.street_number"
                    required
                    :rules="streetNumberRule"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="6"
                  sm="12"
                  md="6"
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
                  cols="5"
                  sm="12"
                  md="5"
              >
                <v-text-field
                    label="*City"
                    v-model="add_organization.city"
                    required
                    :rules="streetNameRule"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="3"
                  sm="12"
                  md="3"
              >
                <v-select
                    required
                    :items="states"
                    v-model="add_organization.state"
                    label="*State"
                    :rules="stateRule"
                >
                </v-select>
              </v-col>
              <v-col
                  cols="3"
                  sm="12"
                  md="3"
              >
                <v-text-field
                    label="*Zip"
                    v-model="add_organization.zip"
                    required
                    :rules="zipRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="4"
                  sm="12"
                  md="4"
              >
                <v-text-field
                    label="Website"
                    v-model="add_organization.website"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="3"
                  sm="12"
                  md="3"
              >
                <v-text-field
                    label="Phone"
                    v-model="add_organization.phone"
                    :rules="businessPhoneRule"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="4"
                  sm="12"
                  md="4"
              >
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
            </v-row>
            <v-row>
              <v-col
                  cols="4"
                  sm="12"
                  md="4"
              >
                <v-select
                    :items="mou_options"
                    v-model="add_organization.mou"
                    required
                    label="*MOU Partner?"
                    :rules="mouRule"
                >
                </v-select>
              </v-col>
              <v-col
                  cols="5"
                  sm="12"
                  md="5"
              >
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
            </v-row>
            <v-row>
              <v-col
                  cols="5"
                  sm="12"
                  md="5"
              >
                <v-select
                    multiple
                    required
                    :items="all_arc_relationships"
                    v-model="add_organization.arc_relationship"
                    :rules="arcFunctionRule"
                    label="*Community Services Provided"
                >
                </v-select>
              </v-col>
              <v-col
                  cols="5"
                  sm="12"
                  md="5"
              >
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
            <v-row class="mt-3">
              <v-col
                  cols="5"
                  sm="12"
                  md="5"
              >
                <v-textarea
                    v-model="add_organization.contact_protocol"
                    rows="2"
                    label="Preferred Method of Contact per RM"
                ></v-textarea>
              </v-col>
              <v-col
                  cols="5"
                  sm="12"
                  md="5"
              >
                <v-textarea
                    v-model="add_organization.service"
                    rows="2"
                    required
                    label="*Additional Notes"
                    :rules="serviceDescriptionRule"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              style="color: #0091CD"
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
//TODO: Resolve validation issue
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
import RelationshipManagerDataService from "@/services/RelationshipManagerDataService";
import "../assets/scss/main.scss";
export default {
  name: "organizations",
  components: {
    JsonExcel,
  },
    data() {
      return {
        isOwner: false,
        permissions: [],
        toolbar_title: 'connections',
        current_user_id: '',

        /**
         * Form validation
         **/
        valid: true,
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
        excel_fields:{
          Name: "name",
          Address: "address",
          Counties: "counties",
          Website: "website",
          Phone: "phone",
          "Preferred Method of Contact": "preferred",
          Contacts: "contact",
          "Last Contact": "last contact",
          Notes: "notes",
          Opportunities: "action",
          "Line of Business": "lob",
          "Agency Type": "type",
          "Community Services Provided": "arc relationship",
          Manager: "relationship manager",
          "Further Notes": "services"
        },
        excel_data:[],

        /**
         * Line of Business
         **/
        all_lines_of_business: [],
        organization_lines_of_business: [],
        unmapped_lines_of_business: [],

        /**
         * Community Services Provided
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
      }
    },
   computed: {
      headers () {
        let headers = [
          {text: 'Name',value: 'name', class: 'red--text text--darken-3'},
          {text: 'Address', value: 'address', class: 'red--text text--darken-3'},
          {text: 'City', value: 'city', class: 'red--text text--darken-3'},
          {text: 'Zip', value: 'zip', class: 'red--text text--darken-3'},
          {text: 'County', value: 'county_display', class: 'red--text text--darken-3' },
          {text: 'Manager', value: 'manager', class: 'red--text text--darken-3'},
          {text: 'MOU', value: 'mou', class: 'red--text text--darken-3'},
          {text: 'Line of Business', value: 'lob', class: 'red--text text--darken-3'},
          {text: 'Agency Type', value: 'type', class: 'red--text text--darken-3'},
          {text: 'Community Services Provided', value: 'arc_rel', class: 'red--text text--darken-3'},
          {text: 'Additional Notes', value: 'service', class: 'red--text text--darken-3'},

        ]
        return headers;
      },
    },
    watch:{
      search: function(){
        this.updateExcelList();
      }
    },
    methods: {
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

        this.$addToLog("Organization:"+this.add_organization.name, "created");
        OrganizationDataService.create(data)
              .then(response => {
                let id = response.data.id;

                //Update phone
                PhoneDataService.create({
                  organizationId: id,
                  number: this.add_organization.phone,
                  isPrimary: true
                }).catch(e => {
                  console.log(e)
                });

                //Update counties
                this.add_organization.county.forEach(county => {
                  this.unmapped_counties.filter(ucounty => {
                    if (ucounty.name == county) {
                      OrganizationCountyDataService.create({
                        organizationId: id,
                        countyId: ucounty.id
                      }).then().catch(e => {
                        console.log(e)
                      });
                    }
                  })
                });

                //Update line of business
                this.add_organization.line_of_business.forEach(lob => {
                  this.unmapped_lines_of_business.filter(ulob => {
                    if (ulob.name == lob) {
                      OrganizationLineOfBusinessDataService.create({
                        organizationId: id,
                        lineOfBusinessId: ulob.id
                      }).then().catch(e => {
                        console.log(e)
                      });
                    }
                  });
                });

                //Update Community Services Provided
                this.add_organization.arc_relationship.forEach(rel => {
                  this.unmapped_arc_relationships.filter(urel => {
                    if (urel.name == rel) {
                      OrganizationArcRelationshipDataService.create({
                        organizationId: id,
                        arcRelationshipId: urel.id
                      }).then().catch(e => {
                        console.log(e)
                      });
                    }
                  });
                });

                //Update agency data
                this.add_organization.agency_type.forEach(type => {
                  this.unmapped_agency_types.filter(utype => {
                    if (utype.name == type) {
                      OrganizationAgencyTypeDataService.create({
                        organizationId: id,
                        agencyTypeId: utype.id
                      });
                    }
                  })
                });

                //Set default relationship manager
                RelationshipManagerDataService.create({
                  personId: this.$session.get('personId'),
                  organizationId: id
                }).then().catch(err=>{console.log(err)});

                this.$router.push('organization/' + id);
              })
              .catch(e => {
                console.log(e)
              });
          this.add_organization_dlg = false;
          this.retrieveOrganizations();
      },
      retrieveOrganizations() {
        OrganizationDataService.getAll()
          .then(response => {
            this.orgCache = response.data;
            this.orgCache.forEach(organization=>{
              //Format managers for table
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

            });
            this.organizations = response.data;
            this.organizations.forEach(organization=>{
              organization.address = organization.street_number+" "+organization.street_name;

              organization.county_display = '';
              organization.counties.forEach(county=>{
                organization.county_display += county.name + ", ";
              });
              organization.county_display = organization.county_display
                  .substr(0,organization.county_display.length-2);
              organization.lob = '';
              organization.line_of_businesses.forEach(lob=>{
                organization.lob += lob.name + "\n";
              });
              organization.lob = organization.lob.substr(0, organization.lob.length-1);
              organization.type = '';
              organization.agency_types.forEach(type=>{
                organization.type += type.name + "\n";
              });
              organization.type = organization.type.substr(0, organization.type.length-1);
              organization.arc_rel = '';
              organization.arc_relationships.forEach(arc_rel=>{
                organization.arc_rel += arc_rel.name + "\n";
              });
              organization.arc_rel = organization.arc_rel.substr(0, organization.arc_rel.length-1);
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
            });
            this.excel_data = this.organizations;
            this.updateExcelList();
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
      updateExcelList(){
        this.excel_data = this.filterOrganizations().map(organization => {
          let orgAddress = organization.street_number + " " +
              organization.street_name.charAt(0).toUpperCase() + organization.street_name.toLowerCase().slice(1) +"\n"+
              organization.city.charAt(0).toUpperCase() + organization.city.toLowerCase().slice(1) +" "+
              organization.state.charAt(0).toUpperCase() + organization.state.toLowerCase().slice(1) +" "+
              organization.zip.toString();
          let orgPhone = organization.phones.length == 0 ? '' : organization.phones[0].number;
          let orgContacts = '';
          organization.people.forEach(person=>{
            let phone = person.phones.length == 0 ? '' : person.phones[0].number;
            let email = person.emails.length == 0 ? '' : person.emails[0].address;
            orgContacts += person.first_name +" " + person.last_name + "\n" +
                person.title+"\n"+
                phone+" | "+email;
          });
          return {
            name: organization.name,
            address: orgAddress,
            counties: organization.county_display,
            website: organization.website,
            phone: orgPhone,
            preferred: organization.contact_protocol,
            contact: orgContacts,
            "last contact": organization.last_contact,
            notes: organization.notes,
            action: organization.action,
            lob: organization.lob,
            type: organization.type,
            "arc relationship": organization.arc_rel,
            "relationship manager": organization.manager,
            services: organization.service
          };
        });
      },
      filterOrganizations(){
        return this.organizations.filter(organization=>{
          return organization.name.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.address.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.city.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.zip.toString().toLowerCase().includes(this.search.toLowerCase()) ||
              organization.county_display.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.manager.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.mou.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.lob.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.type.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.arc_rel.toLowerCase().includes(this.search.toLowerCase()) ||
              organization.service.toLowerCase().includes(this.search.toLowerCase());
        });
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
