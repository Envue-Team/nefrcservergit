<template>
  <v-app>
    <v-app-bar
        tile
        absolute
        flat
        app
        style="background-color: #7F181B"
    >
        <v-btn
            class="mr-3"
            elevation="1"
            fab
            small
            @click.stop="mini = !mini"
        >
        <v-icon class="mdi mdi-dark mdi-dots-vertical"></v-icon>
        </v-btn>
        <v-toolbar-title
        class="hidden-sm-and-down"
        style="color: white"
        >{{getPageTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            flat
            icon
        >
          <v-icon class="mdi mdi-light mdi-account"></v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        app
    >
    <v-img src="./assets/images/rescuers.jpeg" height="100%">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="./assets/images/red_crescent_trprnt.png"/>
        </v-list-item-avatar>

        <v-list-item-title style="color: #a01212; font-weight: 500">
          <strong>American Red Cross</strong>
        </v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
            active-class="blue"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list
          nav
          tile
          dense
      >
      <v-divider></v-divider>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            active-class="active-drawer-link"
            dark
            :to="item.link"
            @click="item.action"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      </v-img>
    </v-navigation-drawer>
    <v-main style="background-color: rgba(70, 9, 9, 0.1)">
      <router-view search="search"/>
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
      'page_title': '',
      'search': '',
      permissions: [],
      userRole:false,
      drawer: true,
      items: [
        // { title: 'Profile', icon: 'mdi-account', link: '/profile' },
        { title: 'Home', icon: 'mdi-home-city', link: '/home', action: null },
        { title: 'Users', icon: 'mdi-account-group-outline', link: '/users', action: null },
        { title: 'Contacts', icon: 'mdi-account-group', link: '/contacts', action: null },
        { title: 'Sign Out', icon: 'mdi-logout', link: '/', action: 'logout()'}
      ],
      mini: true,
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
    verifyAccess(type) {
      switch (type) {
        case 'modify':
          if (this.permissions.includes('modifyUsers')) {
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
    },
    findUserRole() {
      let userRole = this.$session.get("userRole");
      if (userRole == 1) {
        this.userRole = true;
      }
    },
  },
  computed: {
    getPageTitle(){
      console.log(this.$route.name);
      switch(this.$route.name){
        case 'organizations':
          return 'Connections';
        case 'users':
          return 'Users';
        case 'contacts':
          return 'Contacts';
        default:
          return this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
      }
    }
  },
  mounted(){
    this.setPagePermissions();
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
