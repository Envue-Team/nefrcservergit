<template>
  <div class="home">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/volunteer/1">Volunteer 1</router-link> |
      <router-link to="/volunteers-list">Volunteers</router-link> | 
      <router-link to="/add-shelter">Add Shelter</router-link> |
      <router-link to="/shelters-list">Shelters</router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
