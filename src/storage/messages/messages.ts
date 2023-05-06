enum AuthMessages {
    OK = "OK",
    USER_EXISTS = "USER_EXISTS"
}

const authMessages = {
    [AuthMessages.OK]: "Ok",
    [AuthMessages.USER_EXISTS]: "Пользователь с таким username уже существует"
}


const messages = {
    ...authMessages
}
export {AuthMessages, messages};
