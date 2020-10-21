<template>
<div class="container">
  <v-row>
    <v-col>
      <h1 style="font-size: 4em">Partners</h1>
    </v-col>
  </v-row>
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
        <h4>Shelters List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(shelter, index) in Shelters"
            :key="index"
            @click="setActiveShelter(shelter, index)"
          >
            {{ shelter.name }}
          </li>
        </ul>

        <button class="m-3 btn btn-sm btn-danger" @click="removeAllShelters">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentshelter">
          <h4>shelter</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentshelter.name }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentshelter.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentshelter.published ? "Published" : "Pending" }}
          </div>

          <a class="badge badge-warning"
            :href="'/Shelters/' + currentshelter.id"
          >
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a shelter...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ShelterDataService from "../services/ShelterDataService";

// export default {
//   name: "shelters-list",
//   data() {
//     return {
//       Shelters: [],
//       currentshelter: null,
//       currentIndex: -1,
//       name: ""
//     };
//   },
//   methods: {
//     retrieveShelters() {
//       ShelterDataService.getAll()
//         .then(response => {
//           this.Shelters = response.data;
//         })
//         .catch(e => {
//           console.log(e.message);
//         });
//     },

//     refreshList() {
//       this.retrieveShelters();
//       this.currentShelters = null;
//       this.currentIndex = -1;
//     },

//     setActiveshelter(shelter, index) {
//       this.currentshelter = shelter;
//       this.currentIndex = index;
//     },

//     removeAllShelters() {
//       ShelterDataService.deleteAll()
//         .then(response => {
//           console.log(response.data);
//           this.refreshList();
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },
    
//     searchTitle() {
//       ShelterDataService.findByName(this.name)
//         .then(response => {
//           this.Shelters = response.data;
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     }
//   },
//   mounted() {
//     this.retrieveShelters();
//   }
// };
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
