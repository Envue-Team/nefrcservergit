import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Volunteer from './views/Volunteer.vue'
import Volunteers from './views/ListVolunteers.vue'
import AddVolunteer from './views/AddVolunteer.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/volunteer/:id',
      name: 'volunteer',
      component: Volunteer
    },
    {
      path: '/volunteers-list',
      name: 'volunteers-list',
      component: Volunteers

    },
    {
      path: '/add-volunteer',
      name: 'add-volunteer',
      component: AddVolunteer

    }
  ]
})
