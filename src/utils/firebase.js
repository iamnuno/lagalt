import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { store } from './store'
import { newUser, getUser } from './apiService';

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

    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + "  " + errorMessage);
                throw "error"
            });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function register(username, email, password) {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + "  " + errorMessage);
                throw "error"
            });

        let id = await newUser(username, email);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection("users").doc(user.uid).set({
                    id: id,
                })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}

async function logout() {
    try {
        await firebase.auth().signOut();
        return true;
    } catch (error) {
        return false;
    }
}

async function getJwt() {
    return firebase.auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
            return idToken;
        })
        .catch(function (error) {
            console.error(error);
            console.error("user is not logged in yet!");
            return null;
        });
}

// eslint-disable-next-line no-async-promise-executor
const onAuthStateChangedPromise = new Promise(async (resolve, reject) => {
    let userId = null;

    await firebase.auth().onAuthStateChanged(async user => {
        if (user !== null) {
            userId = user.uid;
            await db.collection("users").doc(userId).get().then((doc) => {
                userId = doc.data().id;
            });
            store.commit('signin');
            store.commit('setUserId', userId);
            store.commit("setUser", await getUser())
        } else {
            store.commit('signout');
            store.commit('setUserId', userId);
            store.commit("setUser", { userName: "unknown" })
        }
        resolve(userId)
    }, err => {
        reject(err)
    })
})

const onAuthStateInit = () => onAuthStateChangedPromise

export { onAuthStateInit, getJwt, login, logout, register };