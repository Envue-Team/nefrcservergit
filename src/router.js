import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Organization from './views/Organizations.vue'
import Partner from './views/Partner.vue'
import Relationship from './views/Relationship.vue'
import Contacts from './views/Contacts.vue'
import Register from './views/Register.vue'
import UserInfo from './views/UserInfo'
import User from './views/User'


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
      path: '/organizations',
      name: 'organizations',
      component: Organization
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/partner/:organizationId',
      name: 'partner',
      component: Partner,
      props: true
    },

    {
      path: '/relationship/:organizationId',
      name: 'relationship',
      component: Relationship
      // props: true
    },

    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
      // props: true
    },

    {
      path: '/user',
      name: 'user',
      component: User
      // props: true
    },
    {
      path: '/userinfo/:personId',
      name: 'userinfo',
      component: UserInfo
      // props: true
    },
  ]
})
