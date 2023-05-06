import {User} from "../models";

function getUser(username: string): User | null {
    const userString = localStorage.getItem(`user_${username}`);
    if (!userString) {
        return null;
    }

    return JSON.parse(userString);
}

export {getUser};