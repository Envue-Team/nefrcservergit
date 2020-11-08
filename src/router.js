import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Organization from './views/Organizations.vue'
import Partner from './views/Partner.vue'
import Relationship from './views/Relationship.vue'
import Contacts from './views/Contacts.vue'


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



  ]
})
