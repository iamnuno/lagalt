import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUserCircle,
    faSearch,
    faFilter,
    faEdit,
    faSave,
    faTimesCircle,
    faPlusCircle,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuelidate from 'vuelidate';
import { BootstrapVue } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { store } from './utils/store';

Vue.prototype.$axios = axios;

library.add(
    faUserCircle,
    faSearch,
    faFilter,
    faEdit,
    faSave,
    faTimesCircle,
    faPlusCircle,
    faPlus
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    store: store,
    router,
}).$mount('#app');
