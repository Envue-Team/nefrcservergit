<template>
	<!---------------------------------View Note Dialog------------------------------->
	<v-dialog 
		v-model="show"
		max-width="600px"	
	>
	<v-card>
		<v-card-title>
			<span class="body-3 font-weight-light">
				<!-- {{ item.author.first_name }} {{ item.author.last_name}} - {{ item.date }} -->
			</span>
		</v-card-title>
		<v-card-text>
		<v-container>
			<v-row>
				<v-col class="col-12">
					<p class="body-2">{{ item.text }}</p>										
				</v-col>
			</v-row>
			<v-row>
				<div class="body-3 font-weight-light">
					<p class="text-capitalize">{{ item.type }}</p>
				</div>
			</v-row>
		</v-container>
		</v-card-text>
		<v-card-actions>
		<v-spacer></v-spacer>

		<v-btn
			color="red darken-1"
			text
			@click="deleteNote(item)"
		>
			Delete
		</v-btn>
		<v-btn 
			color="blue darken-1" 
			text 
			@click.stop="show=false">
				Close
		</v-btn>		
		</v-card-actions>
	</v-card>
	<!---------------------------------//View Note Dialog------------------------------> 
	</v-dialog>
</template>

<script>
  export default {
      props: {
		 value: Boolean,
		 item: Object
	  },
	  methods:{
		deleteNote(val){
			this.$emit('input', false);
			this.$parent.deleteNote(val)
		}
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