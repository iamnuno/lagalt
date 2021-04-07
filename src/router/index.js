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
import axios from 'axios';
import { BASE_API_URL, API_URL } from '../constants/constants';

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
    { path: '/profile', name: 'profile', component: UserProfile },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach(async (to, from, next) => {
    await onAuthStateInit();
    if (
        (to.name === 'login' || to.name === 'register') &&
        (await store.getters.isAuthorized)
    ) {
        next({ name: 'home' });
    } else if (to.name === 'ProjectAdminView') {
        let id = to.params.id;
        axios
            .get(
                BASE_API_URL +
                    API_URL +
                    '/users-projects/' +
                    store.getters.userId +
                    '/' +
                    id,
                {
                    headers: {
                        Authorization: 'Bearer ' + store.getters.jwt,
                    },
                }
            )
            .then((response) => {
                if (response.data.admin) {
                    next();
                } else {
                    alert('You are not authorized');
                }
            });
    } else {
        next();
    }
});

export { router };
