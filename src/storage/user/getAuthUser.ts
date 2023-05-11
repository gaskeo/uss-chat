import {User} from "../models";

function getAuthUser(): User | null {
    const userString = sessionStorage.getItem("user");
    if (!userString) {
        return null;
    }
    return JSON.parse(userString);
}

export {getAuthUser};