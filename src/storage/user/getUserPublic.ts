import {User, UserPublic} from "../models";

function getUserPublic(username: string): UserPublic | null {
    const userString = localStorage.getItem(`user_${username}`);
    if (!userString) {
        return null;
    }

    const user: User = JSON.parse(userString);
    return {
        username: user.username,
        name: user.name,
        color: user.color
    }
}

export {getUserPublic};