import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: '',
        jwt: '',
        isAuthorized: false,
    },
    getters: {
        user: state => {
            return state.user;
        },
        jwt: state => {
            return state.jwt;
        },
        isAuthorized: state => {
            return state.isAuthorized;
        }
    },
    mutations: {
        signout: state => {
            state.isAuthorized = false;
        },
        signin: state => {
            state.isAuthorized = true;
        }
    }
})
