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
import UserPage from './views/UserPage'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      get component(){
        if(!this.$authenticated){
          return Login;
        }else{
          return Organizations;
        }
      }
    },
    {
      path: '/home',
      name: 'organizations',
      component: Organizations
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
      // component: function() {
      //   if (this.$session.get("userRole") == 0) {
      //     return Users;
      //   }
      // }
    },
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: Users
    // },
    {
      path: '/user/:personId',
      name: 'user',
      component: User
    },
    {
      path: '/userpage',
      name: 'userpage',
      component: UserPage
    },
  ]
})