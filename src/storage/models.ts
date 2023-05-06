export interface User {
    name: string,
    password: string,
    salt: string,
    username: string
}

export interface Room {
    id: string;
    name: string;
    users: string[];
}

