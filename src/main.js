import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import VueSession from 'vue-session';
import VueTouch from 'vue-touch';

import UserDataService from "@/services/UserDataService";
import ActivityLogDataService from "@/services/ActivityLogDataService";

Vue.use(VueSession);
Vue.use(VueTouch);
Vue.use(Toasted);
Vue.config.productionTip = false;
Vue.prototype.$authenticated = false;
Vue.prototype.$addToLog = function(item, action) {
    var data = {
        entry: ""
    };
    var username;
    UserDataService.getByUserId(this.$session.get("userID"))
        .then((response) => {
            username = response.data.person.first_name+" "+response.data.person.last_name;
            data.entry = item+" was "+action+" by "+username;
            // console.log(data.entry);

            //TODO uncomment to keep workin on activity log
            ActivityLogDataService.create(data).
            then((response) => {
              console.log(response);
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
            console.log(e.message);
        });
},

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
