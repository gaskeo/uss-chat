enum AuthMessages {
    OK = "OK",
    USER_EXISTS = "USER_EXISTS",
    USER_NOT_EXISTS = "USER_NOT_EXISTS",
    BAD_PASSWORD = "BAD_PASSWORD"
}

const authMessages = {
    [AuthMessages.OK]: "Ok",
    [AuthMessages.USER_EXISTS]: "Пользователь с таким username уже существует",
    [AuthMessages.USER_NOT_EXISTS]: "Такого пользователя не существует",
    [AuthMessages.BAD_PASSWORD]: "Неправильный пароль"
}


const messages = {
    ...authMessages
}
export {AuthMessages, messages};
