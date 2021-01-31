import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Organizations from './views/Organizations.vue'
import Organization from './views/Organization.vue'
import Contacts from './views/Contacts.vue'
import Contact from './views/Contact.vue'
import Register from './views/Register.vue'
import User from './views/User'
import Users from './views/Users'
import Login from './views/Login'
 
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: Organizations
    },
    {
      path: '/organization/:organizationId',
      name: 'organization',
      component: Organization
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/contact/:personId',
      name: 'contact',
      component: Contact
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/user/:personId',
      name: 'user',
      component: User
    },
  ]
})