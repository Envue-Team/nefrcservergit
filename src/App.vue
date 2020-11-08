<template>
  <div id="app">
<router-view @authenticated="setAuthenticated"/>
  </div>
</template>
<script>
  import Footer from '@/components/Footer'
  export default {
    name: 'App',
    data() {
      return {
        authenticated: false,
        mockAccount: {
          username: "test",
          password: "test"
        }
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "login" });
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
      }
    },
    components: {
      Footer: Footer
      // Navigation: Navigation
    },
  }
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
