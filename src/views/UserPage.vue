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

/* ---------- Flow of Events ----------
*  1) User views profile page
*  2) User clicks on open dialog box
*  3) Dialog box populates the name, and email field **function**
*  4) Email field can be edited, but not name
*  5) Change password link **function**
*  6) Dialog box asks for current password, and to input new password
*     6.a) If current password is correct, change
*     6.b) else, "Wrong password, contact administrator for password change."
 */
export default {
  name: "userpage",
  data: () => ({
    FirstName: "",
    LastName: "",
    CurrentEmail: "",
    CurrentPassword: "",
    NewEmail: "",
    NewPassword: "",
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
    updatePerson() {

    },
  },
  mounted() {
    this.retrieveUserInfo();
  },
};
</script>

<style>
</style>