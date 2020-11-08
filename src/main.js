import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$authenticated = false;
Vue.prototype.$mockAccount = {
  password: 'test',
  username: 'test'
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
