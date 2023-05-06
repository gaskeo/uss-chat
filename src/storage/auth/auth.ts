import {generateSalt} from "../../utils";
import sjcl from "sjcl";
import {userExists} from "../user/userExists";
import {AuthMessages} from "../messages/messages";


interface User {
    username: string;
    password: string;
    name: string;
}

function addUser(user: User) {
    if (userExists(user.username)) {
        return AuthMessages.USER_EXISTS;
    }

    const salt = generateSalt();
    const passwordWithSalt = user.password + salt;
    const passwordWithSaltBit = sjcl.hash.sha256.hash(passwordWithSalt)
    const passwordHashed = sjcl.codec.hex.fromBits(passwordWithSaltBit);

    const userJson = JSON.stringify({
        name: user.name,
        password: passwordHashed,
        salt: salt,
        username: user.username
    });

    localStorage.setItem(user.username, userJson);
    return AuthMessages.OK;
}

export {addUser};
