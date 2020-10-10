<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="shelter.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="street_number">Street Number</label>
        <input
          class="form-control"
          id="street_number"
          required
          v-model="shelter.street_number"
          name="street_number"
        />
      </div>

      <div class="form-group">
        <label for="street_name">Street Name</label>
        <input
          class="form-control"
          id="street_name"
          required
          v-model="shelter.street_name"
          name="street_name"
        />
      </div>

	<div class="form-group">
        <label for="city">City</label>
        <input
          class="form-control"
          id="city"
          required
          v-model="shelter.city"
          name="city"
        />
      </div>

	<div class="form-group">
        <label for="state">State</label>
        <input
          class="form-control"
          id="state"
          required
          v-model="shelter.state"
          name="state"
        />
      </div>

	  	<div class="form-group">
        <label for="zip">Zip</label>
        <input
          class="form-control"
          id="zip"
          required
          v-model="shelter.zip"
          name="zip"
        />
      </div>

      <button @click="saveshelter" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newshelter">Add</button>
    </div>
  </div>
</template>

<script>
import ShelterDataService from "../services/ShelterShelterDataService";

export default {
  name: "add-shelter",
  data() {
    return {
      shelter: {
        id: null,
        name: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveshelter() {
      console.log(this.shelter);
      var data = {
        name: this.shelter.name,
        description: this.shelter.description
      };

      ShelterDataService.create(data)
        .then(response => {
          this.shelter.id = response.data.id;
          console.log("response id: " + response.data.id);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newshelter() {
      this.submitted = false;
      this.shelter = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
