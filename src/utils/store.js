import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userId: '',
        isAuthorized: false,
        user: "unknown",
        jwt: null,
    },
    getters: {
        userId: state => {
            return state.userId;
        },
        isAuthorized: state => {
            return state.isAuthorized;
        },
        user: state => {
            return state.user;
        },
        jwt: state => {
            return state.jwt;
        }
    },
    mutations: {
        signout: state => {
            state.isAuthorized = false;
        },
        signin: state => {
            state.isAuthorized = true;
        },
        setUserId: (state, payload) => {
            state.userId = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        updateJWT: (state, payload) => {
            state.jwt = payload;
        }
    },

})
