<template>
  <!--  <div id="app">-->
  <!--    <v-app>-->
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <v-card class="pa-1" style="background-color: #c4dff6">
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
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                            v-model="loginEmail"
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
                        <v-btn
                            color="blue"
                            text
                            @click="password_recover = true"
                        >Forgot Password</v-btn
                        >
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
                      <v-col cols="5" sm="5">
                        <v-text-field
                            v-model="Email"
                            :rules="emailRules"
                            label="Email"
                            maxlength="40"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" class="mt-6">
                        <h2>@redcross.org</h2>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                            v-model="Phone"
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
                        >{{ this.RegisteredMessage }}</v-alert
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
    <!-- ############################   FORGOT PASSWORD DIALOG BOX ########################################## --->
    <v-dialog v-model="password_recover" max-width="600px">
      <v-card class="pa-1" style="background-color: #c4dff6">
        <v-card>
          <v-form v-model="valid" lazy-validation>
            <v-card-title>
              <span class="dlg-title">Forgot Password?</span>
            </v-card-title>
            <v-card-text>
              <p>Please, put your email address on file to request a new password. The new password will be sent to your email.</p>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                        v-model="loginEmail"
                        :rules="loginEmailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- make an input field for roles -->
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="password_recover = false">
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="sendPasswordEmail"
                  :disabled="!valid"
              >
                Save
              </v-btn>
            </v-card-actions>
            <v-alert
                v-if="this.ForgotPassword"
                :color="this.ForgotPasswordColor"
                dense
                dismissible
                :type="this.ForgotPasswordType"
            >{{ this.ForgotPasswordMessage }}</v-alert
            >
          </v-form>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
  <!--    </v-app>-->
  <!--  </div>-->
</template>


<script>
import UserDataService from "../services/UserDataService";
import UserRoleDataService from "../services/UserRoleDataService";
import PhoneDataService from "@/services/PhoneDataService";
import EmailDataService from "@/services/EmailDataService";
import EmailerDataServiceProvider from "../services/EmailerDataServiceProvider";
const crypto = require("crypto");
export default {
  name: "Login",
  computed: {
    passwordMatch() {
      return () => this.Password === this.verify || "Password must match";
    },
  },
  methods: {
    // generateSalt() {
    //   return crypto.randomBytes(16).toString("base64");
    // },
    // encryptPassword(plainText, salt) {
    //   return crypto
    //       .createHash("sha256")
    //       .update(plainText)
    //       .update(salt)
    //       .digest("hex");
    // },
    testPassword(salt, originalPass, loginPassword) {
      let password = this.encryptPassword(loginPassword, salt);
      return originalPass == password;
    },
    checkCredentials() {
      UserDataService.findByEmail(this.loginEmail)
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
    checkEmail() {
      EmailDataService.get();
    },
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
    sendPasswordEmail() {
      UserDataService.findByEmail(this.loginEmail)
          .then((response) => {
            if (response.data.length == 0) {
              this.ForgotPassword = true;
              this.ForgotPasswordColor = "red";
              this.ForgotPasswordType = "alert";
              this.ForgotPasswordMessage = "Email Does Not Exist.";
            } else if (response.data.length >= 1) {
              let userEmail = response.data[0].emails[0].address;
              let userPass = response.data[0].user.password;

              let size = 8;
              let characters =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

              for (let i = 0, charSize = characters.length; i < size; ++i) {
                this.passwordReturn += characters.charAt(
                    Math.floor(Math.random() * charSize)
                );
              }

              let salt = this.generateSalt();
              let password = this.encryptPassword(this.passwordReturn, salt);

              var data = {
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                email: userEmail,
                password: password,
                salt: salt,
              };
              let personId = response.data[0].id;

              UserDataService.update(personId, data).then(() => {
                let data = {
                  sendTo: userEmail,
                  subject: "Password Reset",
                  text: "Here is your new password " + this.passwordReturn,
                  // html: "Here is your new password" + this.passwordReturn,
                };
                EmailerDataServiceProvider.sendMail(data)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((e) => {
                      console.log(e);
                    });
              });

              //update password with 'passwordReturn' then email client.

              this.ForgotPassword = true;
              this.ForgotPasswordColor = "green";
              this.ForgotPasswordType = "success";
              this.ForgotPasswordMessage = "Password reset link has been sent.";
            }
          })
          .catch((e) => {
            this.ForgotPassword = true;
            this.ForgotPasswordColor = "red";
            this.ForgotPasswordType = "alert";
            this.ForgotPasswordMessage =
                "Something went wrong, please contact your Administrator.";
          });
    },
    login() {
      this.error = true;
      if (this.$authenticated) {
        this.$session.start();
        this.$session.set("personId", this.PersonId);
        this.$session.set("userID", this.UserId);
        this.$session.set("userRole", this.UserRole);
        this.$router.replace({ name: "organizations" });
        this.$emit("setPagePermissions");
        var aName = '';
      } else {
        this.FailedLogin = true;
      }
    },
    register() {
      var data = {
        first_name: this.FirstName,
        last_name: this.LastName,
        email: this.Email + '@redcross.org',
        password: this.Password,
      };
      var emailName = data.first_name+' '+data.last_name;
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
            EmailDataService.create(emailData);
            UserRoleDataService.create(data)
                .then((resp) => {
                  this.Registered = true;
                  this.RegisteredColor = "green";
                  this.RegisteredType = "success";
                  this.RegisteredMessage = "Successfully Registered.";
                })
                .catch((err) => {
                  this.Registered = true;
                  this.RegisteredColor = "red";
                  this.RegisteredType = "alert";
                  this.RegisteredMessage =
                      "Something went wrong, please contact your administrator.";
                });
            this.sendEmailNotification(emailName);
          })
          .catch((e) => {
            console.log(e);
          });
      this.add_person_dlg = false;
    },
    sendEmailNotification(name){
      //get all admin emails
      var users = [];
      var adminEmails = [];
      UserDataService.getAll()
          .then((response) => {
            users = response.data;
            users.forEach(user => {
              if(user.user.roles[0].id == 0) {
                console.log("Email administrator");
                adminEmails.push(user.emails[0]);
                var data =  {
                  sendTo: user.emails[0].address,
                  subject: "New User Registered",
                  html: "<p>A new user registered with the name '"
                      +name+
                      "' , please login to the website to view the new user<p>",
                }
                EmailerDataServiceProvider.sendMail(data)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((e) => {
                      console.log(e);
                    })
              }
            });
          })
          .catch((e) => {
            console.log(e);
          })
    },
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
    password_recover: false,
    passwordReturn: "",
    RegisteredType: "",
    RegisteredColor: "",
    RegisteredMessage: "",
    ForgotPassword: false,
    ForgotPasswordColor: "",
    ForgotPasswordType: "",
    ForgotPasswordMessage: "",
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
      (v) => /@$/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /^[a-zA-Z0-9_]*$/.test(v) || "Email must be valid",
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
