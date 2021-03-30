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

import firebase from "firebase/app";
import axios from 'axios'

Vue.prototype.$axios = axios;

const firebaseConfig = {
    apiKey: "AIzaSyBzwHI_Dpcsqt8YQLTvUk-MrfIdpUhWWWI",
    authDomain: "lagalt-147b3.firebaseapp.com",
    databaseURL: "https://lagalt-147b3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lagalt-147b3",
    storageBucket: "lagalt-147b3.appspot.com",
    messagingSenderId: "1090780834044",
    appId: "1:1090780834044:web:4709295c1b1f6ff33f8f79",
    measurementId: "G-XL3WFBW3W0"
}

firebase.initializeApp(firebaseConfig);


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
