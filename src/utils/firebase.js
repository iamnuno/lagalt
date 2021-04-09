import { store } from './store';
import { newUser, getUser } from './apiService';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQtLPSvrYafuLKh9QXMr0745iICV3SgsE",
    authDomain: "lagalt-b4984.firebaseapp.com",
    projectId: "lagalt-b4984",
    storageBucket: "lagalt-b4984.appspot.com",
    messagingSenderId: "593921093939",
    appId: "1:593921093939:web:ab97fdbe7fab78b5de4e46",
    measurementId: "G-ETKWWXN5PD"
}

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

async function login(username, password) {
    const loginForm = document.querySelector('#login')
    let state = true;

    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .catch((error) => {
                loginForm.querySelector('.error').innerHTML = error.message;
                state = false;
            });
    } catch (err) {
        loginForm.querySelector('.error').innerHTML = err.message;
        state = false;
    }
    return state;
}

/**
 * register new user 
 * @returns true if the user is registered successfully 
 */
async function register(username, email, password) {
    const registerForm = document.querySelector('#register')
    let status = true;

    try {
        // register the new user in firebase auth
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                registerForm.querySelector('.error').innerHTML = error.message;
                status = false;
            });

        if (status) {
            // save user's credentials  in backend
            let id = await newUser(username, email);
            // save user id in firestore to be used later
            firebase.auth().onAuthStateChanged((user) => {

                if (user) {
                    db.collection("users").doc(user.uid).set({
                        id: id,
                    }).catch((error) => {
                        console.error("Error writing document: ", error.message);
                    });
                }
            })
        }
    } catch (error) {
        status = false;
    }
    return status;
}

/**
 * 
 * @returns true of the user logs out successfully, otherwise return false 
 */
async function logout() {
    try {
        await firebase.auth().signOut();
        store.commit("updateJWT", null)
        store.commit("signout")
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 
 * @returns jwt object if the user is logged in
 */
async function getJwt() {
    const user = firebase.auth().currentUser;

    if (user)
        return firebase.auth()
            .currentUser.getIdToken(true)
            .then(function (idToken) {
                return idToken;
            })
            .catch(function (error) {
                console.error(error);
                console.error("user is not logged in yet!");
            });
    return null;
}

/**
 * updates store as the user logs in and out
 * 
 */
const onAuthStateChangedPromise = new Promise((resolve, reject) => {
    let userId = null;

    firebase.auth().onAuthStateChanged(async user => {
        if (user !== null) {
            userId = user.uid;
            // fetching userId from firestore on log in
            await db.collection("users").doc(userId).get().then((doc) => {
                userId = doc.data().id;
                store.commit('signin');
                store.commit('setUserId', userId);
            });
            store.commit("setUser", await getUser())
        } else {
            store.commit('signout');
            store.commit('setUserId', null);
            store.commit("setUser", { userName: "unknown" })
            store.commit("updateJWT", null)
        }
        resolve(userId)
    }, err => {
        reject(err)
    })
})

const onAuthStateInit = async () => await onAuthStateChangedPromise

export { onAuthStateInit, getJwt, login, logout, register };