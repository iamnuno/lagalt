import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userId: '',
        isAuthorized: false,
    },
    getters: {
        userId: state => {
            return state.userId;
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
        },
        setUserId: (state, payload) => {
            state.userId = payload;
        }
    }
})
