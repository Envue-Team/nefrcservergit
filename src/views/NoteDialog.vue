<template>
  <v-container>
  <!---------------------------------Add Note Dialog------------------------------->
  <v-dialog
      max-width="600px"
      v-model="show"
  >
    <v-card>
      <v-form>
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
                    v-model="text"
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
              @click.stop="show=false"
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
      </v-form>
    </v-card>
  </v-dialog>
  <!---------------------------------//Add Note Dialog------------------------------>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        text: '',
      }
    },
    props: {
      value: Boolean,
      item: Object
	  },
    methods:{
      addNote(){
        let data = {
          text: this.text,
        };
        this.$emit('input', false);
        this.$parent.addNote(data);
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
    }
  };
</script>