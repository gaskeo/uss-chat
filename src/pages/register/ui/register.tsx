import React, {useRef, useState} from "react";
import styles from "../styles/register.module.css";
import {register as registerStorage} from "../../../storage";
import {AuthMessages, messages, SystemMessages} from "../../../storage/messages/messages";
import {Link, useNavigate} from "react-router-dom";
import {Input, Header, Text, Button} from "../../../components/kit";

export default function Register() {
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        register();
    }

    function register() {
        const password = passwordRef?.current?.value;
        const passwordAgain = passwordAgainRef?.current?.value;
        const username = usernameRef?.current?.value;
        const name = nameRef?.current?.value;

        if (!password || !username || !name || !passwordAgain) return updateMessage(SystemMessages.FIELDS_NOT_FILL);
        if (password !== passwordAgain) return updateMessage(AuthMessages.PASSWORDS_NOT_MATCH);

        const message = registerStorage({username, password, name});
        updateMessage(message);
        if (message === AuthMessages.OK) {
            navigate("/login");
        }
    }

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordAgainRef = useRef<HTMLInputElement>(null);

    const nameRef = useRef<HTMLInputElement>(null);

    const [message, updateMessage] = useState<AuthMessages | SystemMessages>(AuthMessages.OK)

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerForm}>
                <Header>
                    Регистрация
                </Header>
                <form onSubmit={onSubmit}>
                    <Input inputRef={usernameRef}
                           label="Username"
                    />
                    <Input inputRef={nameRef}
                           label="Имя"
                    />

                    <Input inputRef={passwordRef}
                           label="Пароль"
                           type="password"
                    />
                    <Input inputRef={passwordAgainRef}
                           label="Пароль ещё раз"
                           type="password"
                    />

                    {message !== AuthMessages.OK && <Text>{messages[message]}</Text>}
                    <Button type="submit" color="success">Зарегистрироваться</Button>
                    <Link to="/login"><Text color="secondary">У меня уже есть аккаунт</Text></Link>
                </form>
            </div>
        </div>
    )
}