import {User} from "../models";

function getUser(username: string): User | null {
    const userString = localStorage.getItem(username);
    if (!userString) {
        return null;
    }

    return JSON.parse(userString);
}

export {getUser};