<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-app-bar
          color="primary"
          flat
          class="hidden-md-and-down"
      >
        <v-toolbar-title>
          <router-link to="/">
            <v-img
                class="mx-2"
                src="../src/assets/images/redcross-logo.png"
                max-height="auto"
                max-width="60%"
                contain
            ></v-img>
          </router-link>
        </v-toolbar-title>
      <router-link to="/home" class="red--text text--darken-2 mr-3">Home</router-link> |
      <router-link to="/contacts" class="red--text text--darken-2 mr-3 ml-3 ">Contacts</router-link> |
      <router-link to="/organizations" class="red--text text--darken-2 ml-3 mr-3">Connections</router-link> |
      <router-link v-show="verifyAccess('modify')" to="/users" class="red--text text--darken-2 ml-3 mr-3">Users</router-link>
      <v-spacer></v-spacer>
      <v-btn
          depressed
          color="red"
          v-on:click="logout"
      >
        Log Out
      </v-btn>
      </v-app-bar>
    </v-app-bar>
    <v-main style="background-color: rgba(45, 70, 40, 0.04)">

        <v-app-bar
            app
            color="primary"
            class="hidden-lg-and-up"
        >
          <router-link to="/home">
            <v-img
                class="mx-2"
                src="../src/assets/images/redcross-logo.png"
                max-height="auto"
                max-width="50%"
                contain
            ></v-img>
          </router-link>
          <v-spacer></v-spacer>
          <v-dialog v-model="navDialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-btn>
            </template>
            <template v-slot:default="navDialog">
              <v-card>
                <v-toolbar
                    flat
                    color="primary"
                >
                  <v-toolbar-title>
                    <router-link to="/home">
                      <v-img
                          class="mx-2"
                          src="../src/assets/images/redcross-logo.png"
                          max-height="auto"
                          max-width="60%"
                          contain
                      ></v-img>
                    </router-link>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn flat icon @click="navDialog.value = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-list
                  nav
                  dense
                >
                  <v-list-item-group
                      v-model="group"
                      active-class="deep-purple--text text--accent-4"
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        <btn @click="navDialog.value=false">
                          <router-link to="/home" class="red--text text--darken-2 mr-3">Home</router-link>
                        </btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-show="verifyAccess('modify')">
                      <v-list-item-icon>
                        <v-icon>groups</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        <btn @click="navDialog.value=false">
                          <router-link to="/home" class="red--text text--darken-2 mr-3">Users</router-link>
                        </btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>contacts</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        <btn @click="navDialog.value=false">
                          <router-link to="/home" class="red--text text--darken-2 mr-3">Contacts</router-link>
                        </btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>domain</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        <btn @click="navDialog.value=false">
                          <router-link to="/home" class="red--text text--darken-2 mr-3">Connections</router-link>
                        </btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </template>
          </v-dialog>
        </v-app-bar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import RoleDataService from "@/services/RoleDataService";
import "../src/assets/scss/main.scss";
export default {
  name: 'App',
  data() {
    return {
      'navDialog': false,
      'group': null,
      permissions: [],
      userRole:false
    }
  },
  methods: {
    logout() {
      this.$authenticated = false;
      this.$session.destroy();

      this.$router.replace({name: "login"});
    },
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
  mounted(){
    this.setPagePermissions();

    findUserRole() {
      let userRole = this.$session.get("userRole");
      if(userRole == 1) {
        this.userRole = true;
      }
    }
  },

};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
