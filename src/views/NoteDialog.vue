<template>
  <v-container>
  <!---------------------------------Add Note Dialog------------------------------->
  <v-dialog
      v-model="show"
      max-width="600px"
  >
    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline">Organization Note</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="12"
                  md="12"
              >
                <v-textarea
                    v-model="add_note_form.text"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="add_note_dlg=false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="addNote"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <!---------------------------------//Add Note Dialog------------------------------>
  </v-container>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      item: Object
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

  }
  };
</script>