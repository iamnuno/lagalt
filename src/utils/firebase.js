import firebase from "firebase/app";
import "firebase/auth";
import { store } from './store' // import the Vuex store
const firebaseConfig = {
    apiKey: "AIzaSyBzwHI_Dpcsqt8YQLTvUk-MrfIdpUhWWWI",
    authDomain: "lagalt-147b3.firebaseapp.com",
    databaseURL: "https://lagalt-147b3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lagalt-147b3",
    storageBucket: "lagalt-147b3.appspot.com",
    messagingSenderId: "1090780834044",
    appId: "1:1090780834044:web:4709295c1b1f6ff33f8f79",
    measurementId: "G-XL3WFBW3W0"
}

firebase.initializeApp(firebaseConfig);

function login(username, password) {

    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + "  " + errorMessage);

            });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function register() {
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + "  " + errorMessage);
        });
}

function logout() {
    try {
        firebase.auth().signOut();
        return true;
    } catch (error) {
        return false;
    }
}

function getJwt() {
    firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
            return idToken;
        })
        .catch(function (error) {
            console.error(error);
            return null;
        });
}
const onAuthStateChangedPromise = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
        store.commit(user !== null ? 'signin' : 'signout');
        resolve(user)
    }, err => {
        reject(err)
    })
})

const onAuthStateInit = () => onAuthStateChangedPromise

export { onAuthStateInit, getJwt, login, logout, register };