import Home from '../views/Home';
import AddProject from '../views/AddProject';
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/project/new', name: 'AddProject', component: AddProject },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});
