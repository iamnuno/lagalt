import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: '',
        jwt: '',
        isLoggedin: true,
    },
    getters: {
        user: state => {
            return state.user;
        },
        jwt: state => {
            return state.jwt;
        },
        isLoggedin: state => {
            return state.isLoggedin;
        }
    },
    mutations: {
        signout: state => {
            state.isLoggedin = false;
        },
        signin: state => {
            state.isLoggedin = true;
        }
    }
})
