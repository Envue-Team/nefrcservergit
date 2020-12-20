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
export default {
  name: 'App',
  mounted() { //TODO: Fix this issue: When this is uncommented, cannot view users dashboard only displays login screen again.
    if(!this.$authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    // setAuthenticated(status) {
    //   this.authenticated = status;
    // },
    // logout: function () {
    //   this.$session.destroy()
    //   this.$router.push('/')
    // }
  }
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
