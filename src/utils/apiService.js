import axios from "axios";
import { API_URL } from "../constants/constants";

async function newUser(username, email) {
    let res;
    await axios.post(API_URL + '/users', {
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

export { newUser }