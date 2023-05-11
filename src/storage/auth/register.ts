import {generateSalt, getRandomColor} from "../../utils";
import sjcl from "sjcl";
import {userExists} from "../user/userExists";
import {AuthMessages} from "../messages/messages";


interface User {
    username: string;
    password: string;
    name: string;
}

function register(user: User) {
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
        username: user.username,
        color: getRandomColor()
    });

    localStorage.setItem(`user_${user.username}`, userJson);
    return AuthMessages.OK;
}

export {register};
