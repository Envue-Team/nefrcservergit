<template>
  <v-container>
    <!---------------------------------Point of Contact Dialog------------------------------->
    <v-dialog
        max-width="600px"
        v-model="show"
    >
      <v-card>
        <v-form v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">{{poc_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="6"
                    sm="6"
                    md="6"
                >
                  <v-text-field
                      label="First Name*"
                      required
                      v-model="first_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="6"
                    sm="6"
                    md="6"
                >
                  <v-text-field
                      label="Last Name*"
                      required
                      v-model="last_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="Street Number"
                      v-model="street_number"
                      :rules="streetNumberRules"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="Street Name"
                      v-model="street_name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="3"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="City"
                      v-model="city"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                      label="State"
                      v-model="state"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                      label="Zip"
                      v-model="zip"
                      :rules="zipRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      required
                      label="Primary Phone"
                      v-model="primary_phone"
                      :rules="phoneRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      label="Secondary Phone"
                      v-model="secondary_phone"
                      :rules="phoneRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      required
                      label="Primary Email"
                      v-model="primary_email"
                      :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      label="Secondary Email"
                      v-model="secondary_email"
                      :rules="emailRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="openDialog('Delete')"
            >
              Delete
            </v-btn>
            <v-btn
                v-show="poc_dlg_action=='Create'"
                color="blue darken-1"
                text
                :disabled="!valid"
                @click="createPOC"
            >
              Save
            </v-btn>
            <v-btn
                v-show="poc_dlg_action=='Edit'"
                color="blue darken-1"
                text
                :disabled="!valid"
                @click="openDialog('Update')"
            >
              Edit
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click.stop="show=false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <!---------------------------------//View Point of Contact Dialog------------------------------>
    </v-dialog>
    <!---------------------------------Delete Point of Contact Dialog------------------------------>
    <v-dialog
        max-width="300"
        v-model="delete_poc_dialog"
    >
      <v-card>
        <v-card-text>
          Are you sure you want to delete this point of contact?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              @click="deletePOC"
              text
              color="red text-darken-1">
            Yes
          </v-btn>
          <v-btn
              @click="delete_poc_dialog=false"
              text
              color="blue text-darken-1"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------------------//Delete Point of Contact Dialog------------------------------>

    <!---------------------------------Save Point of Contact Dialog------------------------------>
    <v-dialog
        max-width="300"
        v-model="update_poc_dialog"
    >
      <v-card>
        <v-card-text>
          Save changes?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              @click="updatePOC"
              text
              color="red text-darken-1">
            Yes
          </v-btn>
          <v-btn
              @click="update_poc_dialog=false"
              text
              color="blue text-darken-1"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------------------//Save Point of Contact Dialog------------------------------>
  </v-container>
</template>

<script>
import PersonDataService from "@/services/PersonDataService";

export default {
  props: {
    value: Boolean,
    poc_id: String,
    poc_title: String,
    poc_dlg_action: String
  },
  data(){
    return {
      update_poc_dialog: false,
      delete_poc_dialog: false,
      save_poc_dialog: false,
      first_name: '',
      last_name: '',
      street_number: '',
      street_name: '',
      city: '',
      state: '',
      zip: '',
      primary_phone: '',
      secondary_phone: '',
      primary_email: '',
      secondary_email: '',

      nameRules: [
        v => !!v || 'A contact name is required',
      ],
      emailRules: [
        (v) => !!v || "Required",
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'Please, input a valid email address'
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^(1-)?\d{3}-\d{3}-\d{4}$/.test(v) || 'Please, input a valid phone number with format XXX-XXX-XXXX'
      ],
      streetNumberRules: [
        (v) => !!v || "Required",
        (v) => /\S\d$/.test(v) || "Street number must be valid",
      ],

      zipRules: [
        v => !!v || 'A zip code is required',
        v => /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(v) || 'Please, input a valid zip code'
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 1) || "Min 5 characters",
      },
    }
    
  },
  methods:{
    openDialog(dlg){
      switch(dlg){
        case 'Save':
          this.save_poc_dialog = true;
          break;
        case 'Delete':
          this.delete_poc_dialog = true;
          break;
        case 'Update':
          this.update_poc_dialog = true;
          break;
      }
    },
    deletePOC(){
      this.delete_poc_dialog = false;
      this.$emit('input', false);
      this.$parent.deletePOC(this.poc_id);
    },
    createPOC(){
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        street_number: this.street_number,
        street_name: this.street_name,
        city: this.city,
        state: this.state,
        zip: this.zip,
        primary_phone: this.primary_phone,
        secondary_phone: this.secondary_phone,
        primary_email: this.primary_email,
        secondary_email: this.secondary_email
      };
      this.$emit('input', false);
      this.$parent.createPOC(data);
    },
    updatePOC(){
      this.update_poc_dialog = false;
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        street_number: this.street_number,
        street_name: this.street_name,
        city: this.city,
        state: this.state,
        zip: this.zip,
        primary_phone: this.primary_phone,
        secondary_phone: this.secondary_phone,
        primary_email: this.primary_email,
        secondary_email: this.secondary_email
      };
      this.$emit('input', false);
      this.$parent.updatePOC(this.poc_id,data);
    }
  },
  computed: {
    show: {
      get () {
        if(this.poc_dlg_action=="Edit"){
          PersonDataService.get(this.poc_id).then(response=>{
            this.first_name = response.data.first_name;
            this.last_name = response.data.last_name;
            this.street_number = response.data.street_number;
            this.street_name = response.data.street_name;
            this.city = response.data.city;
            this.state = response.data.state;
            this.zip = response.data.zip;
            response.data.phones.forEach(phone=>{
              if(phone.isPrimary){
                this.primary_phone = phone.number;
              }else{
                this.secondary_phone = phone.number;
              }
            });
            response.data.emails.forEach(email=>{
              if(email.isPrimary){
                this.primary_email = email.address;
              }else{
                this.secondary_email = email.address;
              }
            });
          }).catch(e=>{console.log(e)});

        }
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

  },
};
</script>