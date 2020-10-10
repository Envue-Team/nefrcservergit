<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Volunteers List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(volunteer, index) in volunteers"
          :key="index"
          @click="setActiveVolunteer(volunteer, index)"
        >
          {{ volunteer.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllVolunteers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentVolunteer">
        <h4>Volunteer</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentVolunteer.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentVolunteer.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentVolunteer.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/Volunteers/' + currentVolunteer.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Volunteer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VolunteerDataService from "../services/VolunteerDataService";

export default {
  name: "volunteers-list",
  data() {
    return {
      volunteers: [],
      currentVolunteer: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveVolunteers() {
      VolunteerDataService.getAll()
        .then(response => {
          this.volunteers = response.data;
        })
        .catch(e => {
          console.log(e.message);
        });
    },

    refreshList() {
      this.retrieveVolunteers();
      this.currentVolunteers = null;
      this.currentIndex = -1;
    },

    setActiveVolunteer(volunteer, index) {
      this.currentVolunteer = volunteer;
      this.currentIndex = index;
    },

    removeAllVolunteers() {
      VolunteerDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      VolunteerDataService.findByName(this.name)
        .then(response => {
          this.volunteers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveVolunteers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
