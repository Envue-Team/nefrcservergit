<template>
  <v-container>
    <!---------------------------------Relationship Manager Dialog------------------------------->
    <v-dialog
        content-class="md-dlg"
        v-model="show"
    >
      <v-card
          elevation="1"
          class="pa-1"
          style="background-color: #6D6E70"
          rounded
      >
      <v-card>
        <v-form>
          <v-card-title>
            <span class="dlg-title">{{rm_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                >
                  <p class="text-h4" v-show="rm_dlg_action=='Edit'">
                    {{relationship_manager.first_name}} {{relationship_manager.last_name}}
                  </p>
                  <v-autocomplete
                      v-show="rm_dlg_action=='Create'"
                      label="Relationship Manager"
                      :items="all_relationship_managers"
                      item-text="name"
                      item-value="value"
                      return-object
                      @change="updateSelectedManager"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                style="color: #0091CD"
                @click.stop="show=false"
                text
            >
              Cancel
            </v-btn>
            <v-btn v-show="rm_dlg_action=='Edit'"
                style="background-color: #ED1B2E; color: white"
                depressed
                v-on:click="openDialog('Delete')"
            >
              Remove Manager
            </v-btn>
            <v-btn
                v-show="rm_dlg_action=='Create'"
                style="background-color: #7F181B; color: white"
                depressed
                v-on:click="openDialog(rm_dlg_action)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      </v-card>
    </v-dialog>

    <!---------------------------------Delete Relationship Manager Dialog------------------------------>
    <v-dialog
        max-width="300"
        v-model="delete_relationship_manager_dialog"
    >
      <v-card>
        <v-card-text>
          Are you sure you want to remove this relationship manager?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              @click="deleteRelationshipManager"
              text
              color="red text-darken-1">
            Yes
          </v-btn>
          <v-btn
              @click="delete_relationship_manager_dialog=false"
              text
              color="blue text-darken-1"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------------------//Delete Relationship Manager Dialog------------------------------>
  </v-container>
</template>

<script>

import RelationshipManagerDataService from "@/services/RelationshipManagerDataService";

export default {
  props: {
    value: Boolean,
    rm_title: String,
    all_relationship_managers: Array,
    rm_dlg_action: String,
    current_relationship_manager_id: String,
    relationship_manager: Object
  },
  data(){
    return {
      delete_relationship_manager_dialog: false,
      save_rm_dialog: false,
      updated_relationship_manager: '',
      organization_relationship_managers: []
    }
  },
  methods:{
    updateSelectedManager(obj){
      this.updated_relationship_manager = {
        value: obj.value
      };
    },
    openDialog(dlg){
      switch(dlg){
        case 'Create':
          this.addRelationshipManager();
          break;
        case 'Delete':
          this.delete_relationship_manager_dialog = true;
          break;
        case 'Edit':
          this.updateRelationshipManager();
          break;
      }
    },
    addRelationshipManager(){
      let data = {
        personId: this.updated_relationship_manager.value
      }
      this.$parent.addRelationshipManager(data);

    },
    updateRelationshipManager(){
      this.update_mgr_dlg = false;
      let data = {
        personId: this.updated_relationship_manager.value
      };
      this.$parent.updateRelationshipManager(data, this.current_relationship_manager_id);
    },
    deleteRelationshipManager(){
      this.update_mgr_dlg = false;
      this.delete_relationship_manager_dialog = false;
      this.$emit('input', false);
      this.$parent.deleteRelationshipManager(this.current_relationship_manager_id);
    },
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

  },
};
</script>