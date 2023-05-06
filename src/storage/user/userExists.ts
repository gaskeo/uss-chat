function userExists(username: string) {
    return Boolean(localStorage.getItem(`user_${username}`));
}

export {userExists};
