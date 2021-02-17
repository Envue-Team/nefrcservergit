<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h2 red--text text--darken-4">Northeast Florida Data Dashboard</div>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="cols-7">
        <router-link class="text-h4 grey--text text--darken-2" to="/contacts">Contacts</router-link>
        <router-link class="text-h4 grey--text text--darken-2" to="/organizations"> | Connections</router-link>
        <router-link class="text-h4 grey--text text--darken-2" to="/userpage"> | Profile Page</router-link>
        <router-link v-show="verifyAccess('modify')" class="text-h4 grey--text text--darken-2" to="/users"> | Users</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoleDataService from "@/services/RoleDataService";
export default {
  name: 'Home',
  data () {
    return {
      permissions: []
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    // logout: function () {
    //   console.log('called');
    //   this.$authenticated = false;
    //   this.$emit('setAuthenticated');
    //   this.$session.destroy()
    //   this.$router.push('/')
    // },
    /**
     * Access
     */
    verifyAccess(type){
      switch(type){
        case 'modify':
          if(this.permissions.includes('modifyUsers')){
            return true;
          } else {
            return false;
          }
        default:
          return false;
      }
    },
    setPagePermissions() {
      let currentRole = this.$session.get("userRole");
      RoleDataService.get(currentRole)
          .then(response => {
            this.permissions = response.data.permissions.map(permission => {
              return permission.name
            });
            console.log(this.permissions);
          })
          .catch(e => {
            console.log(e)
          });
    }
  },
  mounted(){
    // this.setPagePermissions();
  },
}
</script>
