<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <v-img
            class="mx-2"
            src="../src/assets/images/redcross-logo.png"
            max-height="auto"
            max-width="60%"
            contain
        ></v-img>
      </router-link>
      <router-link to="/home" class="red--text text--darken-2 mr-3">Home</router-link> |
      <router-link to="/contacts" class="red--text text--darken-2 mr-3 ml-3 ">Contacts</router-link> |
      <router-link to="/organizations" class="red--text text--darken-2 ml-3 mr-3">Connections</router-link> |
      <router-link to="/users" class="red--text text--darken-2 ml-3 mr-3">Users</router-link>
      <v-spacer></v-spacer>
      <v-btn
          depressed
          color="red"
          v-on:click="logout"
      >
        Log Out
      </v-btn>
    </v-app-bar>
    <v-main style="background-color: rgba(45, 70, 40, 0.04)">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  // mounted() { //TODO: UNCOMMENT FOR LOGIN PAGE
  //   if(!this.$authenticated) {
  //     this.$router.replace({ name: "login" });
  //   }
  // },
  // methods: {
  //   logout() {
  //     this.$authenticated = false;
  //     this.$session.destroy();
  //     this.$router.replace({ name: "login" });
  //   }
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