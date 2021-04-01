import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../views/Home';
import ProjectUserView from '../views/ProjectUserView';
import ProjectAdminView from '../views/ProjectAdminView';
import UserProfile from '../views/UserProfile';
import AddProject from '../views/AddProject';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/project/new', name: 'AddProject', component: AddProject },
    { path: '/project/:id', name: 'project', component: ProjectUserView },
    {
        path: '/project/:id/admin',
        name: 'ProjectAdminView',
        component: ProjectAdminView,
    },
    { path: '/profile', name: 'Profile', component: UserProfile },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});
