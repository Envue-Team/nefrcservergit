<template>
  <div v-if="currentVolunteer" class="edit-form">
    <h4>Volunteer</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentVolunteer.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <p>{{currentVolunteer.description}}</p>
        <input type="text" class="form-control" id="description"
          v-model="currentVolunteer.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentVolunteer.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentVolunteer.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteVolunteer"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateVolunteer"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Volunteer...</p>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "volunteer",
  data() {
    return {
      currentVolunteer: null,
      message: ''
    };
  },
  methods: {
    getVolunteer(id) {
      VolunteerDataService.get(id)
        .then(response => {
          this.currentVolunteer = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentVolunteer.id,
        title: this.currentVolunteer.name,
        description: this.currentVolunteer.description,
        published: status
      };

      VolunteerDataService.update(this.currentVolunteer.id, data)
        .then(response => {
          this.currentVolunteer.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateVolunteer() {
      VolunteerDataService.update(this.currentVolunteer.id, this.currentVolunteer)
        .then(response => {
          console.log(response.data);
          this.message = 'The volunteer was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteVolunteer() {
      VolunteerDataService.delete(this.currentVolunteer.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "volunteers" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  
  mounted() {
    this.message = '';
    this.getVolunteer(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
