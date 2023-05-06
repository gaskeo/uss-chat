function generateSalt() {
    const saltArray = new Uint32Array(1);
    crypto.getRandomValues(saltArray);

    return saltArray[0].toString();
}

export {generateSalt};
