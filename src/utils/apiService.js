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

async function getRelatedProjectByUser() {
    return await axios
        .get(BASE_API_URL + API_URL + '/suggestions/' + store.getters.userId, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getAvailableProjects(industry = "", search = "", status = "") {

    const params = new URLSearchParams([["industry", industry.toUpperCase().replaceAll(" ", "_")],
    ["search", search], ["status", status.toUpperCase().replaceAll(" ", "_")]]);

    return await axios
        .get(BASE_API_URL + API_URL + '/projects/projects', { params })
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUserProjects(url) {
    return await axios
        .get(BASE_API_URL + url, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUser() {
    return await axios
        .get(BASE_API_URL + API_URL + '/users/' + store.getters.userId, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getProjectById(id) {
    return await axios
        .get(BASE_API_URL + API_URL + '/projects/' + id, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getUsersProjectsById(userId, projectId) {
    return await axios
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
    console.log(url)
    return axios.get(url).then((res) => { return res.data }).catch(() => { return [] })
}

async function newApplication(motivation, projectId) {
    return await axios
        .post(BASE_API_URL + API_URL + '/users-projects', {
            user: {
                userId: store.getters.userId,
            },
            project: {
                projectId: projectId
            },
            motivation: motivation
        }, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function newProjectCard(title, text, projectId) {
    const date = new Date().toJSON();
    return await axios
        .post(BASE_API_URL + API_URL + '/project-cards', {
            projectCardTitle: title,
            projectCardText: text,
            projectCardCreatedAt: date,
            project: {
                projectId: projectId
            }
        }, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function isAdmin(projectId) {
    return await axios
        .get(BASE_API_URL + API_URL +
            "/users-projects/" + store.getters.userId + "/" + projectId, await config())
        .then((response) => {

            return response.data;
        })
        .catch((err) => {
            if (err.response.status == 404)
                return false;
        }
        )
}

async function getAnnouncements(url) {
    return await axios
        .get(BASE_API_URL + url, await config())
        .then((response) => {

            return response.data;
        })
        .catch((err) => {
            if (err.response.status == 404)
                return false;
        }
        )
}

async function getCollaborators(userUrl) {
    return await axios
        .get(BASE_API_URL + userUrl, await config())
        .then((response) => {
            return response.data;
        })
        .catch((err) => alert(err));
}

async function getProjectCards(url) {
    return await axios
        .get(BASE_API_URL + url, await config())
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
    getRelatedProjectByUser,
    isAdmin,
    newApplication,
    getAnnouncements,
    newProjectCard,
    getProjectCards,
};
