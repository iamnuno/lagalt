import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../views/Home';
import ProjectUserView from '../views/ProjectUserView';
import UserProfile from '../views/UserProfile';
import AddProject from '../views/AddProject';
import Register from '../views/Register';
import Login from '../views/Login';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/project/new', name: 'addProject', component: AddProject },
    { path: '/project/:id', name: 'project', component: ProjectUserView },
    { path: '/profile', name: 'Profile', component: UserProfile },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});
