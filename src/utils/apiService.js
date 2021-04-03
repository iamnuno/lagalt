import axios from "axios";
import { BASE_API_URL, API_URL } from "../constants/constants";
import { store } from './store';

async function newUser(username, email) {
    let res;
    await axios.post(BASE_API_URL + API_URL + '/users', {
        userName: username,
        userEmail: email,
        userSkills: null
    }).then((response) => {
        res = response.data.userId;
    }).catch(function (error) {
        console.log(error);
    });
    return res;
}

async function getAvailableProjects() {
    return axios
        .get(BASE_API_URL + API_URL + '/projects')
        .then((response) => { return response.data })
        .catch((err) => alert(err));
}

async function getUserProjects() {
    return axios
        .get(BASE_API_URL + API_URL + '/projects')
        .then((response) => { return response.data })
        .catch((err) => alert(err));
}

async function getUser() {
    return axios
        .get(BASE_API_URL + API_URL + '/users/' + store.getters.userId)
        .then((response) => { return response.data })
        .catch((err) => alert(err));
}

async function getProjectById(id) {
    return axios.get(BASE_API_URL + API_URL + '/projects/' + id)
        .then((response) => { return response.data })
        .catch((err) => alert(err));
}

async function getGitCommit(url) {
    url = "https://api.github.com/repos/iamnuno/lagalt/commits";
    return axios
        .get(url)
        .then((response) => { return response.data })
        .catch((err) => alert(err));
}

async function getCollaborators(userUrl) {
    return axios.get(BASE_API_URL + userUrl).then(response => { return response.data }).catch((err) => alert(err))
}
export { newUser, getAvailableProjects, getUserProjects, getUser, getProjectById, getGitCommit, getCollaborators }