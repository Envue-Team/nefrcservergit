 import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import VueSession from 'vue-session';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueSession);
Vue.use(Toasted);
Vue.config.productionTip = false;

Vue.prototype.$authenticated = false;
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
