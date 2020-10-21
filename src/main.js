import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false
// export default new Vuetify(vuetifyOpts)


new Vue({
  router,
  vuetify,
  // Vuetify,
  render: h => h(App)
}).$mount('#app')
