<template>
  <v-app>
    <v-app-bar
        v-if="!isLoginPage"
        tile
        absolute
        flat
        app
        style="background-color: #7F181B"
    >
        <v-btn
            class="mr-3 hidden-md-and-down"
            elevation="1"
            fab
            small
            @click.stop="toggleMini"
        >
        <v-icon class="mdi mdi-dark mdi-dots-vertical"></v-icon>
        </v-btn>
        <v-btn
            class="mr-3 hidden-md-and-up"
            elevation="1"
            fab
            small
            @click.stop="toggleDrawer"
        >
          <v-icon class="mdi mdi-dark mdi-dots-vertical"></v-icon>
        </v-btn>
        <v-toolbar-title
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
        v-if="!isLoginPage"
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
            v-show="item.isVisible"
            link
            active-class="active-drawer-link"
            dark
            :to="item.link"
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
      <video
          class="hidden-md-and-down"
          style="width:100%; height: auto;" v-if="isLoginPage" playsinline autoplay muted loop>
        <source :src='require("./assets/videos/arc_short.mp4")' type='video/mp4'>
      </video>
      <router-view @setPagePermissions="setPagePermissions" />
    </v-main>
  </v-app>
</template>

<script>
import RoleDataService from "@/services/RoleDataService";
import "../src/assets/scss/main.scss";
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';

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
      mini: true,
      items: '',
    }
  },
  components: {
    mdbContainer,
    mdbRow,
    mdbCol
  },
  methods: {
    toggleMini(){
      this.mini = !this.mini;
    },
    toggleDrawer(){
      this.drawer = !this.drawer;
    },
    /**
     * Access
     */
    verifyAccess() {
      return this.permissions.includes('modifyUsers');
    },
    setPagePermissions() {
      let currentRole = this.$session.get("userRole");
      RoleDataService.get(currentRole)
          .then(response => {
            this.permissions = response.data.permissions.map(permission => {
              return permission.name
            });
            this.setNavLinks();
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
    setNavLinks(){
      this.items = [
        // { title: 'Profile', icon: 'mdi-account', link: '/profile' },
        { title: 'Home', icon: 'mdi-home-city', link: '/home', isVisible: true },
        { title: 'Users', icon: 'mdi-account-group-outline', link: '/users', isVisible: this.verifyAccess('modify') },
        { title: 'Contacts', icon: 'mdi-account-group', link: '/contacts', isVisible: true },
        { title: 'Sign Out', icon: 'mdi-logout', link: '/', isVisible: true}
      ];
    },
  },
  computed: {
    isLoginPage(){
      return this.$route.name=='login';
    },
    getPageTitle(){
      switch(this.$route.name){
        case 'organizations':
          return 'American Red Cross Partners';
        case 'users':
          return 'American Red Cross Users';
        case 'contacts':
          return 'American Red Cross Contacts';
        case 'organization':
          return ' American Red Cross Partner';
        default:
          return 'American Red Cross ' + this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
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
