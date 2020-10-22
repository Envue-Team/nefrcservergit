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
              label="Search"
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
                <span class="red--text">{{ item.name }}</span>&nbsp
                <span v-if="item.public_safety">(Public Safety)</span>
              </template>
              <template v-else-if="item.partner!==null">
                <span class="green--text">{{ item.name }}</span>&nbsp
                <span v-if="item.public_safety">(Public Safety)</span> 
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
        public_safety: true
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
        
      }
      console.log(item);
    },
    retrieveOrganizations() {
      OrganizationDataService.getAll()
        .then(response => {
          this.orgCache = response.data;
          this.organizations = response.data;
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    filterOrganizations(){
      this.organizations = this.orgCache.filter(organization=>{
        return (this.filters['partners'] && organization.partner !== null) | 
        (this.filters['relationships'] && organization.relationship !== null) | 
        (this.filters['public_safety'] && organization.public_safety);
      });
    }
  },
  mounted() {
    this.retrieveOrganizations();
  }
};
</script>
