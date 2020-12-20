<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h2 red--text text--darken-4">Northeast Florida Data Dashboard</div>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="cols-7">
        <router-link class="text-h4 grey--text text--darken-2" to="/contacts">Contacts | </router-link>
        <router-link class="text-h4 grey--text text--darken-2" to="/organizations">Connections | </router-link>
        <router-link class="text-h4 grey--text text--darken-2" to="/users">Users</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return { }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>
