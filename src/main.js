import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import { BootstrapVue } from 'bootstrap-vue';
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

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
