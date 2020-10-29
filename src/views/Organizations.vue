<template>
<div class="container">
  <v-row>
    <v-col cols="12">
      <div class="text-h1 red--text text--lighten-1">Connections</div>
    </v-col>
  </v-row>
  <v-row>

      <v-col class="col-10 offset-1">
        <v-row>
          <v-col class="col-3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Table"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-5">
            <v-chip
                  :input-value="filters.partners"
                  @click="filters.partners = !filters.partners; filterOrganizations()"
                  filter color="#66BB"
          >Partners</v-chip>
          <v-chip
                  :input-value="filters.relationships"
                  @click="filters.relationships = !filters.relationships; filterOrganizations()"
                  filter color="deep-orange"
          >Relationships</v-chip>
          <v-chip
                  :input-value="filters.public_safety"
                  @click="filters.public_safety = !filters.public_safety; filterOrganizations()"
                  filter color="green lighten-1"
           >Public Safety</v-chip>
            <v-chip
                  :input-value="filters.my_assignments"
                  @click="filters.my_assignments = !filters.my_assignments; filterOrganizations()"
                  filter color="blue lighten-1"
           >My Assignments</v-chip>
          </v-col>
        </v-row>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="organizations"
            @click:row="nav"
            item-key="id"
            multi-sort
            >
            <template v-slot:item.name="{ item }">
              <template v-if="item.relationship !== null">
                <span class="red--text">{{ item.name }}</span>
                <span v-if="item.public_safety"> (Public Safety)</span>
              </template>
              <template v-else-if="item.partner!==null">
                <span class="purple--text">{{ item.name }}</span>
                <span v-if="item.public_safety"> (Public Safety)</span> 
              </template>
            </template>
            <template
              v-slot:item.address="{ item }"
            >
              <address>
                {{ item.street_number }} {{ item.street_name}}<br>
                {{ item.city }}, {{ item.state }} {{ item.zip }}
              </address>
          </template>
          <template v-slot:item.manager ="{ item }">
            {{ item.manager }}

          </template>
        </v-data-table>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import OrganizationDataService from "../services/OrganizationDataService";

export default {
  name: "organizations",
    data() {
      return {
        filters:{
          partners: true, 
          relationships: true,
          public_safety: true,
          my_assignments: false
        },
        search: '',
        organizations: [],
        orgCache: [],
      };
    },
   computed: {
      headers () {
        var headers = [
          {text: 'Agency',value: 'name', width: '80px'},
          {text: 'Address', value: 'address', width: '80px'},
          {text: 'County', value: 'county', width: '100px' },
          {text: 'Manager', value: 'manager', width: '100px'},
        ]
        if(this.filters.partners){
          headers.push({text: "Services", value:'partner.services', width: '80px'});
        }
        if(this.filters.relationships){
          headers.push({text: "Status",value:'relationship.status', width: '80px'});
        }
        return headers;
      },
    },
    methods: {
      nav(item){
        if(item.partner !== null){
          this.$router.push({ path: "partner/"+item.id});
        }else if(item.relationship != null){
          this.$router.push({ path: "relationship/"+item.id});
        }
      },
      retrieveOrganizations() {
        OrganizationDataService.getAll()
          .then(response => {
            // console.log(response.data);
            this.orgCache = response.data;
            this.orgCache.forEach(organization=>{
              console.log(organization.relationship_managers);
              if(organization.relationship_managers !== null && organization.relationship_managers.length !== 0){
                var manager = organization.relationship_managers[0].person;
                var manager_data = manager.first_name+" "+manager.last_name;
                organization.manager = manager_data;
                var phones = '';
                manager.phones.forEach(phone=>{
                  phones += phone.number+" \n"
                });
                var emails = '';
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
              if(organization.relationship_managers !== null && organization.relationship_managers.length !== 0){
                var manager = organization.relationship_managers[0].person;
                var manager_data = manager.first_name+" "+manager.last_name;
                var phones = '';
                manager.phones.forEach(phone=>{
                  phones += phone.number+" \n"
                });
                var emails = '';
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
          })
          .catch(e => {
            console.log(e.message);
          });

      },
      filterOrganizations(){
        this.organizations = this.orgCache.filter(organization=>{
          var assign = this.filters['my_assignments'] ? organization.managerId == "5693164c-5da4-4d07-ad24-d9f39befc823" : true;
          return (this.filters['partners'] && organization.partner !== null && assign) | 
          (this.filters['relationships'] && organization.relationship !== null && assign) | 
          (this.filters['public_safety'] && organization.public_safety && assign)
        });
      }
    },
    mounted() {
      this.retrieveOrganizations();
    }
};
</script>
