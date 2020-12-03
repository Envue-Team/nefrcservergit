<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <div id="nav">
            <router-link v-if="authenticated" to="/user" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <v-icon>mdi-open-in-new</v-icon>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import User from './views/User.vue';

export default {
  name: 'App',

    data() {
      return {
        authenticated: false,
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "home" });
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
    }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
