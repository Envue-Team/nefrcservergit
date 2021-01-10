<template>
  <div v-if="currentShelter" class="edit-form">
    <h4>Shelter</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentShelter.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <p>{{currentShelter.description}}</p>
        <input type="text" class="form-control" id="description"
          v-model="currentShelter.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentShelter.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentShelter.published"
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
      @click="deleteShelter"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateShelter"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Shelter...</p>
  </div>
</template>

<script>
import ShelterDataService from "../services/ShelterDataService";

export default {
  name: "shelter",
  data() {
    return {
      currentShelter: null,
      message: ''
    };
  },
  methods: {
    getShelter(id) {
      ShelterDataService.get(id)
        .then(response => {
          this.currentShelter = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentShelter.id,
        title: this.currentShelter.name,
        description: this.currentShelter.description,
        published: status
      };

      ShelterDataService.update(this.currentShelter.id, data)
        .then(response => {
          this.currentShelter.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateShelter() {
      ShelterDataService.update(this.currentShelter.id, this.currentShelter)
        .then(response => {
          console.log(response.data);
          this.message = 'The Shelter was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteShelter() {
      ShelterDataService.delete(this.currentShelter.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Shelters" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  
  mounted() {
    this.message = '';
    this.getShelter(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
