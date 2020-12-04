<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <a href="/">
        <v-img
            class="mx-2"
            src="../src/assets/images/redcross-logo.png"
            max-height="auto"
            max-width="60%"
            contain
        ></v-img>
      </a>
      <a href="/" class="red--text text--darken-2 mr-3">Home</a> |
      <a href="/contacts" class="red--text text--darken-2 mr-3 ml-3 ">Contacts</a> |
      <a href="/organizations" class="red--text text--darken-2 ml-3 mr-3">Connections</a> |
      <a href="/users" class="red--text text--darken-2 ml-3 mr-3">Users</a>
      <v-spacer></v-spacer>
      <a href="" style="color: darkred">Logout</a>
    </v-app-bar>
    <v-main style="background-color: rgba(45, 70, 40, 0.04)">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import User from './views/User.vue';

export default {
  name: 'App',

    // data() {
    //   return {
    //     authenticated: false,
    //   }
    // },
    // mounted() {
    //   if(!this.authenticated) {
    //     this.$router.replace({ name: "home" });
    //   }
    // },
    // methods: {
    //   setAuthenticated(status) {
    //     this.authenticated = status;
    //   },
    // }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.page-title{
  font-family: "Roboto", sans-serif;
  margin-left: -50px;
  font-size: 2.45em;
}
</style>
