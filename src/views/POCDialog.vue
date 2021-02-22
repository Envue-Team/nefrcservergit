<template>
  <v-container>
    <!---------------------------------Point of Contact Dialog------------------------------->
    <v-dialog
        content-class="lg-dlg"
        v-model="show"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-card-title>
            <span class="dlg-title">{{poc_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
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
                    cols="12"
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
                  class="col-md-4 col-sm-12"
                >
                  <v-text-field
                      label="Title*"
                      required
                      v-model="title"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      required
                      label="Phone*"
                      v-model="primary_phone"
                      :rules="phoneRules"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      required
                      label="Email*"
                      v-model="primary_email"
                      :rules="emailRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
                v-show="poc_dlg_action=='Edit'"
                style="background-color: #ED1B2E; color: white"
                depressed
                @click="openDialog('Delete')"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                style="color: #0091CD"
                text
                @click.stop="show=false"
            >
              Close
            </v-btn>
            <v-btn
                :disabled="!valid"
                v-show="poc_dlg_action=='Create'"
                style="background-color: #7F181B; color: white"
                depressed
                @click="createPOC"
            >
              Save
            </v-btn>
            <v-btn
                v-show="poc_dlg_action=='Edit'"
                style="background-color: #7F181B; color: white"
                depressed
                :disabled="!valid"
                @click="openDialog('Update')"
            >
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      </v-card>
      <!---------------------------------//View Point of Contact Dialog------------------------------>
    </v-dialog>
    <!---------------------------------//Point of Contact Dialog------------------------------->

    <!---------------------------------Delete Point of Contact Dialog------------------------------>
    <v-dialog
        content-class="small-dlg"
        v-model="delete_poc_dialog"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
      <v-card>
        <v-btn
            text
            disabled=true
            style="color: #ED1B2E !important"
        >
          Caution
        </v-btn>
        <v-card-text>
          Are you sure you want to delete this point of contact?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              @click="delete_poc_dialog=false"
              style="background-color: #0091CD; color: white"
              depressed
          >
            No
          </v-btn>
          <v-btn
              @click="deletePOC"
              style="background-color: #7F181B; color: white"
              depressed
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-card>
    </v-dialog>
    <!---------------------------------//Delete Point of Contact Dialog------------------------------>

    <!---------------------------------Save Point of Contact Dialog------------------------------>
    <v-dialog
        v-model="update_poc_dialog"
        content-class="small-dlg"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
      <v-card>
        <v-btn
            text
            disabled=true
            style="color: #ED1B2E !important"
        >
          Caution
        </v-btn>
        <v-card-text>
          Are you sure you want to save these changes?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              @click="update_poc_dialog=false"
              style="background-color: #0091CD; color: white"
              depressed
          >
            No
          </v-btn>
          <v-btn
              @click="updatePOC"
              style="background-color: #7F181B; color: white"
              depressed
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
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
      valid: false,
      update_poc_dialog: false,
      delete_poc_dialog: false,
      save_poc_dialog: false,
      first_name: '',
      last_name: '',
      title: '',
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
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'Please, input a valid email address'
      ],
      phoneRules: [
        v => /^(1-)?\d{3}-\d{3}-\d{4}$/.test(v) || 'Please, input a valid phone number with format XXX-XXX-XXXX'
      ],
      streetNumberRules: [
        (v) => /\S\d$/.test(v) || "Street number must be valid",
      ],
      zipRules: [
        v => /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(v) || 'Please, input a valid zip code'
      ],
      states:[
        "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT",
        "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID",
        "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME",
        "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND",
        "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK",
        "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX",
        "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV",
        "WY"
      ],
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
        secondary_email: this.secondary_email,
        title: this.title,
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
        secondary_email: this.secondary_email,
        title: this.title,
      };
      this.$emit('input', false);
      this.$parent.updatePOC(this.poc_id,data);
    },

    /**
     * Form validation
     **/
    validate () {
      this.$refs.form.validate()
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
            this.title = response.data.title;
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

        }else{
          if(this.$refs.form != null){
            this.$refs.form.reset();
          }
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