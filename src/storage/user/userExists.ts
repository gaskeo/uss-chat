function userExists(username: string) {
    return Boolean(localStorage.getItem(username));
}

export {userExists};
