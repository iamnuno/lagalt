import axios from 'axios';
import { BASE_API_URL, API_URL } from '../constants/constants';
import { store } from './store';
import * as firebase from './firebase'

async function config() {
    store.commit('updateJWT', await firebase.getJwt());

    return {
        headers: {
            Authorization: 'Bearer ' + store.getters.jwt,
        }
    }
}

async function newUser(username, email) {
    let res;
    await axios
        .post(
            BASE_API_URL + API_URL + '/users',
            {
                userName: username,
                userEmail: email,
                userSkills: null,
            },
            await config()
        )
        .then((response) => {
            res = response.data.userId;
        })
        .catch(function (error) {
            console.log(error);
        });
    return res;
}

async function updateUser(user) {
    let res;
    await axios
        .put(
            BASE_API_URL + API_URL + `/users/${user.userId}`,
            {
                userName: user.userName,
                userEmail: user.userEmail,
                userDescription: user.userDescription,
                userVisibility: user.userVisibility,
                userPortfolio: user.userPortfolio,
                userSkills: user.userSkills,
            },
            await config()
        )
        .then((response) => {
            res = response.data.userId;
        })
        .catch(function (error) {
            console.log(error);
        });
    return res;
}

async function newProject(project) {
    let res;
    await axios
        .post(
            BASE_API_URL + API_URL + '/projects',
            {
                userId: project.userId,
                projectTitle: project.projectTitle,
                projectDescription: project.projectDescription,
                projectProgress: project.projectProgress,
                projectType: project.projectType,
                projectSkills: project.projectSkills,
                projectTags: project.projectTags,
                externalUrl: project.externalUrl,
                projectBackgroundPhoto: project.BackgroundPhoto,
                projectPhotos: project.projectPhotos,
            },
            await config()
        )
        .then((response) => {
            res = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return res;
}

async function getAvailableProjects(industry = "", search = "", status = "") {
    console.log(await config())
    let query = "";

    if (industry != "" || search != "" || status != "") {
        query = "?" + (industry == "" ? "" : "industry=" + industry) + (status == "" ? "" : "status=" + status) + (search == "" ? "" : "search=" + search)
    }

    return axios
        .get(BASE_API_URL + API_URL + '/projects' + query, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUserProjects() {
    return axios
        .get(BASE_API_URL + API_URL + '/projects', await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUser() {
    return axios
        .get(BASE_API_URL + API_URL + '/users/' + store.getters.userId, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getProjectById(id) {
    return axios
        .get(BASE_API_URL + API_URL + '/projects/' + id, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUsersProjectsById(userId, projectId) {
    return axios
        .get(
            BASE_API_URL + API_URL + `/users-projects/${userId}/${projectId}`,
            await config()
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getGitCommit(url) {
    url = 'https://api.github.com/repos/iamnuno/lagalt/commits';
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getCollaborators(userUrl) {
    return axios
        .get(BASE_API_URL + userUrl)
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}
export {
    newUser,
    updateUser,
    newProject,
    getAvailableProjects,
    getUserProjects,
    getUser,
    getProjectById,
    getGitCommit,
    getCollaborators,
    getUsersProjectsById,
};
