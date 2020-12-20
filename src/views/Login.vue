<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
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
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1"
                        ></v-text-field>
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
            <!-- <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="FirstName"
                          :rules="[rules.required]"
                          label="First Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="LastName"
                          :rules="[rules.required]"
                          label="Last Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="UserId"
                          :rules="[rules.required]"
                          label="User ID"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="Email"
                          :rules="emailRules"
                          label="E-mail"
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
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'Password'"
                          name="input-10-1"
                          label="Confirm Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                          >Register</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item> -->
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>


<script>
import UserDataService  from '../services/UserDataService';
const crypto = require('crypto');
export default {
  name: 'Login',
  computed: {
    passwordMatch() {
      return () => this.Password === this.verify || "Password must match";
    }
  },
  methods: {
    generateSalt() {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword(plainText, salt) {
      return crypto
          .createHash('sha256')
          .update(plainText)
          .update(salt)
          .digest('hex')
    },
    testPassword(salt, originalPass, loginPassword) {
      let password = this.encryptPassword(loginPassword, salt);
      console.log(password);
      console.log(originalPass);
      return originalPass == password;
    },
    checkCredentials(){
      console.log("Success");
      UserDataService.getByEmail(this.loginEmail)
          .then(response=>{
            console.log(response.data);
            let originalPassword = response.data[0].user.password;
            let salt = response.data[0].user.salt;

            this.UserId = response.data[0].user.id;
            this.UserRole = response.data[0].user.roles[0].id;

            console.log(originalPassword);
            console.log(salt);
            let authenticated = this.testPassword(salt, originalPassword, this.loginPassword);
            console.log("Authenticated: " + authenticated);
            this.$authenticated = authenticated;
            this.login();
          }).catch(e=>{
        console.log(e);
      });
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        UserDataService.getAll()
            .then((response)=> {
              let objectData = response
              console.log(objectData);
              this.checkCredentials();
            })
            .catch((err)=> {
              console.log(err);
            })
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      if(this.$authenticated) {

        this.$session.start();
        this.$session.set('userID', this.UserId);
        this.$session.set('userRole', this.UserRole);
        this.$router.replace({name: "home"});
      } else {
        console.log("Wrong password");
      }
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      {name:"Login", icon:"mdi-account"},
      // {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,

    FirstName: "",
    UserId: "",
    UserRole: "",
    LastName: "",
    Email: "",
    Password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 5) || "Min 5 characters"
    }
  })
};
</script>
