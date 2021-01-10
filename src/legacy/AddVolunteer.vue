<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="volunteer.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="volunteer.description"
          name="description"
        />
      </div>

      <button @click="saveVolunteer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVolunteer">Add</button>
    </div>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "add-volunteer",
  data() {
    return {
      volunteer: {
        id: null,
        name: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveVolunteer() {
      console.log(this.volunteer);
      var data = {
        name: this.volunteer.name,
        description: this.volunteer.description
      };

      VolunteerDataService.create(data)
        .then(response => {
          this.volunteer.id = response.data.id;
          console.log("response id: " + response.data.id);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newVolunteer() {
      this.submitted = false;
      this.volunteer = {};
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
