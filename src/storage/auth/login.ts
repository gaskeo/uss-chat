import {AuthMessages} from "../messages/messages";
import sjcl from "sjcl";
import {getUser} from "../user/getUser";

interface User {
    username: string;
    password: string;
}

function login(user: User) {
    const userFromStore = getUser(user.username);
    if (!userFromStore) {
        return AuthMessages.USER_NOT_EXISTS;
    }

    const salt = userFromStore.salt;
    const passwordWithSalt = user.password + salt;
    const passwordWithSaltBit = sjcl.hash.sha256.hash(passwordWithSalt)
    const passwordHashed = sjcl.codec.hex.fromBits(passwordWithSaltBit);
    if (passwordHashed === userFromStore.password) {
        const userJson = JSON.stringify(userFromStore);
        sessionStorage.setItem("user", userJson);
        return AuthMessages.OK;
    }
    return AuthMessages.BAD_PASSWORD;
}

export {login};
