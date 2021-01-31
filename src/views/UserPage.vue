<template>
  <v-app>
    <v-container>
    <v-row>
      <v-col cols="12">
        <div align="center" class="red--text text--darken-4 page-title">
          Welcome {{this.FirstName}}
        </div>
      </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "userpage",
  data: () => ({
    FirstName: "",
    LastName: "",

  }),
  methods: {
    retrieveUserInfo() {
      let personId = this.$session.get("personId");

      UserDataService.get(personId)
        .then((response) => {
          this.FirstName = response.data.first_name;
          console.log(this.FirstName);
          console.log(response);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
  mounted() {
    this.retrieveUserInfo();
  },
};
</script>

<style>
</style>