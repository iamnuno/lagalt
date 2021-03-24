import Home from '../views/Home';
import UserProfile from '../views/UserProfile';
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: UserProfile },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});
