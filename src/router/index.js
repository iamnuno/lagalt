import Home from '../views/Home'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
    { path: "/", name: "Home", component: Home }
]

export const router = new VueRouter({
    mode: 'history',
    routes
})