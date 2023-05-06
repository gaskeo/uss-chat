import {generateSalt} from "../../utils";

function addUser() {
    const salt = generateSalt();
    console.log(salt)
}

export {addUser};