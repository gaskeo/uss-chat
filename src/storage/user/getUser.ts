interface User {
    name: string,
    password: string,
    salt: string,
    username: string
}

function getUser(username: string): User | null {
    const userString = localStorage.getItem(username);
    if (!userString) {
        return null;
    }

    return JSON.parse(userString);
}

export {getUser};