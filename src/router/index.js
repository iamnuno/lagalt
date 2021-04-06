import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../views/Home';
import ProjectUserView from '../views/ProjectUserView';
import ProjectAdminView from '../views/ProjectAdminView';
import UserProfile from '../views/UserProfile';
import AddProject from '../views/AddProject';
import Register from '../views/Register';
import Login from '../views/Login';
import { onAuthStateInit } from '../utils/firebase';
import { store } from '../utils/store';


Vue.use(VueRouter);
const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/project/new', name: 'addProject', component: AddProject },
    { path: '/project/:id', name: 'project', component: ProjectUserView },
    {
        path: '/project/:id/admin',
        name: 'ProjectAdminView',
        component: ProjectAdminView,
    },
    { path: '/profile', name: 'Profile', component: UserProfile },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach(async (to, from, next) => {
    await onAuthStateInit()
    if ((to.name === 'login' || to.name === 'register') && await store.getters.isAuthorized) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export { router };
