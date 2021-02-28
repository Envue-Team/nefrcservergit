<template>
  <!--  <div id="app">-->
  <!--    <v-app>-->
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <v-card
        class="pa-1"
        style="background-color: #C4DFF6"
    >
      <v-card>
        <v-tabs
            v-model="tab"
            show-arrows
            background-color="red"
            icons-and-text
            dark
            grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.name">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-title
                  style="color: grey"
              >
                <v-img src="../assets/images/req_logo.png" max-width="70px" style="margin-left: -20px; margin-right: 20px"/>
                American Red Cross of Northeast Florida<br/>
                Data Dashboard
              </v-card-title>
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          counter
                          @click:append="show1 = !show1"
                      ></v-text-field>
                      <v-alert
                          v-if="FailedLogin"
                          color="red"
                          dense
                          dismissible
                          type="error"
                      >Invalid Credentials</v-alert
                      >
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-title
                  style="color: grey"
              >
                <v-img src="../assets/images/req_logo.png" max-width="70px" style="margin-left: -20px; margin-right: 20px"/>
                American Red Cross of Northeast Florida<br/>
                Data Dashboard
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                          v-model="FirstName"
                          :rules="nameRules"
                          label="First Name"
                          maxlength="20"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                          v-model="LastName"
                          :rules="nameRules"
                          label="Last Name"
                          maxlength="20"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                          v-model="Email"
                          :rules="emailRules"
                          label="Email"
                          maxlength="20"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                          v-model="Phone"
                          @keyup="formatPhone()"
                          :rules="phoneRules"
                          label="Phone"
                          maxlength="20"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="Password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'Password'"
                          name="input-10-1"
                          label="Password"
                          counter
                          @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show2 ? 'text' : 'Password'"
                          name="input-10-1"
                          label="Confirm Password"
                          counter
                          @click:append="show2 = !show2"
                      ></v-text-field>
                      <v-alert
                          v-if="Registered"
                          :color="this.RegisteredColor"
                          dense
                          dismissible
                          :type="this.RegisteredType"
                      >{{this.RegisteredMessage}}</v-alert
                      >
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="register"
                      >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-card>
  </v-dialog>
  <!--    </v-app>-->
  <!--  </div>-->
</template>


<script>
import UserDataService from "../services/UserDataService";
import UserRoleDataService from "../services/UserRoleDataService";
import PhoneDataService from "@/services/PhoneDataService";
import EmailDataService from "@/services/EmailDataService";
const crypto = require("crypto");

//email import
import EmailerDataServiceProvider from "@/services/EmailerDataServiceProvider";

export default {
  name: "Login",
  computed: {
    passwordMatch() {
      return () => this.Password === this.verify || "Password must match";
    },
  },
  methods: {
    generateSalt() {
      return crypto.randomBytes(16).toString("base64");
    },
    encryptPassword(plainText, salt) {
      return crypto
          .createHash("sha256")
          .update(plainText)
          .update(salt)
          .digest("hex");
    },
    testPassword(salt, originalPass, loginPassword) {
      let password = this.encryptPassword(loginPassword, salt);
      return originalPass == password;
    },
    checkCredentials() {
      UserDataService.getByEmail(this.loginEmail)
          .then((response) => {
            let originalPassword = response.data[0].user.password;
            let salt = response.data[0].user.salt;
            this.UserId = response.data[0].user.id;
            this.PersonId = response.data[0].id;
            this.UserRole = response.data[0].user.roles[0].id;
            let authenticated = this.testPassword(
                salt,
                originalPassword,
                this.loginPassword
            );
            this.$authenticated = authenticated;
            this.login();
          })
          .catch((e) => {
            this.FailedLogin = true;
            console.log(e);
          });
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        UserDataService.getAll()
            .then((response) => {
              let objectData = response;
              this.checkCredentials();
            })
            .catch((err) => {
              console.log(err);
            });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      this.error = true;
      if (this.$authenticated) {
        this.$session.start();
        this.$session.set("personId", this.PersonId);
        this.$session.set("userID", this.UserId);
        this.$session.set("userRole", this.UserRole);
        this.$router.replace({ name: "organizations" });
        this.$emit('setPagePermissions');
      } else {
        this.FailedLogin = true;
      }
    },
    register() {
      var data = {
        first_name: this.FirstName,
        last_name: this.LastName,
        email: this.Email,
        password: this.Password,
      };
      var name = this.FirstName+' '+this.LastName;
      console.log("name is "+name);
      UserDataService.create(data)
          .then((response) => {
            let data = {
              userId: response.data.userId,
              roleId: 2,
            };
            let phoneData = {
              personId: response.data.personId,
              number: this.Phone,
              isPrimary: true,
            };
            let emailData = {
              personId: response.data.personId,
              address: this.Email,
              isPrimary: true,
            };
            PhoneDataService.create(phoneData);
            console.log(name);
            // this.$addToLog(name, "registered");
            EmailDataService.create(emailData);
            UserRoleDataService.create(data)
                .then((resp) => {
                  this.Registered = true;
                  this.RegisteredColor = "green";
                  this.RegisteredType = "success";
                  this.RegisteredMessage = "Successfully Registered."
                })
                .catch((err) => {
                  this.Registered = true;
                  this.RegisteredColor = "red";
                  this.RegisteredType = "alert";
                  this.RegisteredMessage = "Something went wrong, please contact your administrator.";
                });
            // this.refreshList();
            this.sendAlertEmail(data);
          })
          .catch((e) => {
            console.log(e);
          });
      this.add_person_dlg = false;
    },
    sendAlertEmail(item){
      console.log("called 1");
      // EmailerDataServiceProvider.getAll()
      // .then(response=>{
      //   console.log("sendMail:");
      //   console.log(response)})
      // .catch(e=>console.log(e));
    },
    formatPhone(){
      this.Phone = this.Phone.replace(/[^0-9]/g, '')
        .replace(/^(\d{3})?(\d{3})?(\d{4})?/g, '($1)$2-$3')
        .substr(0,13);
    }
  }, 
  
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    FailedLogin: false,
    Registered: "",
    RegisteredType: "",
    RegisteredColor: "",
    RegisteredMessage: "",
    FirstName: "",
    UserId: "",
    PersonId: "",
    UserRole: "",
    LastName: "",
    Email: "",
    Password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    Phone: "",
    phoneRules: [
      (v) => !!v || "Required",
      (v) => /\S\d$/.test(v) || "Phone number must be valid",
    ],
    nameRules: [
      (v) => !!v || "Required",
      (v) => /\D\S$/.test(v) || "No white or empty spaces",
    ],
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 1) || "Min 5 characters",
    },
  }),
};
</script>