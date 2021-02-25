import Vue from 'vue'
import Router from 'vue-router'
import Organizations from './views/Organizations.vue'
import Organization from './views/Organization.vue'
import Contacts from './views/Contacts.vue'
import Contact from './views/Contact.vue'
import Register from './views/Register.vue'
import User from './views/User'
import Users from './views/Users'
import Login from './views/Login'
import Profile from './views/Profile'
import NotFound from './views/404'

Vue.use(Router);
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/organizations',
      name: 'organizations',
      alias: '/home',
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
      alias: '/admin',
      component: Users
    },
    {
      path: '/user/:personId',
      name: 'user',
      component: User
    },
    {
      path: '/profile/:personId',
      name: 'profile',
      component: Profile
    },
    {
      path: '/404', name: 'NotFound', component: NotFound
    },
    {
      path: '/:catchAll(.*)', redirect:'404'
    }
  ]
});