<template>
  <v-app>
    <v-app-bar
        v-if="!isLoginPage"
        tile
        absolute
        text
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
            small
            @click.stop="toggleDrawer"
        >
          <v-icon class="mdi mdi-dark mdi-menu"></v-icon>
        </v-btn>
        <v-toolbar-title
        style="color: white"
        >{{getPageTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            v-on:click="navigateToProfile"
        >
          <v-icon class="mdi mdi-light mdi-face"></v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-if="!isLoginPage"
        v-model="drawer"
        :mini-variant.sync="mini"
        app
    >
    <v-img src="./assets/images/rescuers.jpeg"  height="100%">
      <v-list-item>
        <v-list-item-avatar style="margin-left: -10px">
          <v-img src="./assets/images/req_logo.png" min-height="70px"/>
        </v-list-item-avatar>

        <v-list-item-title style="color: white; font-weight: bolder">
          American Red Cross
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
            v-on:click="item.click"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          active-class="active-drawer-link"
          dark
          @click="logout"
        >
          <v-list-item-icon>
            <v-icon class="mdi mdi-logout"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-img>
    </v-navigation-drawer>
    <v-main style="background-color: rgba(70, 9, 9, 0.1);">
      <div class="video-container">
      <video
          height="100%"
          width="100%"
          style="overflow: hidden"
          v-if="isLoginPage" playsinline autoplay muted loop>
        <source :src='require("./assets/videos/arc_short.mp4")' type='video/mp4'>
      </video>
      </div>
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
        { title: 'Profile', icon: 'mdi-face', link: '/profile/'+this.$session.get("personId"), isVisible: true, click: '' },
        { title: 'Partners', icon: 'mdi-home-city', link: '/home', isVisible: true, click: '' },
        { title: 'Admin', icon: 'mdi-account-key', link: '/users', isVisible: this.verifyAccess('modify'), click: '' },
        { title: 'Contacts', icon: 'mdi-account-group', link: '/contacts', isVisible: true, click: '' },
      ];
    },
    logout() {
      this.$authenticated = false;
      this.$session.destroy()
      this.$router.push('/')
    },
    navigateToProfile(){
      return this.$router.replace('/profile/'+this.$session.get('personId'));
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
        case 'organization':
          return ' American Red Cross Partners';
        case 'users':
          return 'American Red Cross Users';
        case 'user':
          return 'American Red Cross Users';
        case 'contacts':
          return 'American Red Cross Contacts';
        case 'contact':
          return 'American Red Cross Contacts';
        default:
          return 'American Red Cross ' + this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
      }
    }
  },
  mounted() { //TODO: UNCOMMENT FOR LOGIN PAGE
    if(!this.$session.exists() && !this.$authenticated) this.$router.replace('/');
    this.setPagePermissions();
  },
};
</script>

<style>
.video-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.video-container video {
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>
