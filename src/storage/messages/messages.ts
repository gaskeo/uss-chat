enum SystemMessages {
    FIELDS_NOT_FILL = "FIELDS_NOT_FILL"
}

enum AuthMessages {
    OK = "OK",
    USER_EXISTS = "USER_EXISTS",
    USER_NOT_EXISTS = "USER_NOT_EXISTS",
    BAD_PASSWORD = "BAD_PASSWORD",
    PASSWORDS_NOT_MATCH = "PASSWORDS_NOT_MATCH"
}

const systemMessages = {
    [SystemMessages.FIELDS_NOT_FILL]: "Не все поля заполнены"
}

const authMessages = {
    [AuthMessages.OK]: "Ok",
    [AuthMessages.USER_EXISTS]: "Пользователь с таким username уже существует",
    [AuthMessages.USER_NOT_EXISTS]: "Такого пользователя не существует",
    [AuthMessages.BAD_PASSWORD]: "Неправильный пароль",
    [AuthMessages.PASSWORDS_NOT_MATCH]: "Пароли не совпадают"
}


const messages = {
    ...systemMessages,
    ...authMessages,
}
export {AuthMessages, SystemMessages, messages};
