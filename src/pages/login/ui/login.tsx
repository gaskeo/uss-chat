import React, {useRef, useState} from "react";
import styles from "../styles/login.module.css";
import {getAuthUser, login as loginStorage} from "../../../storage";
import {AuthMessages, messages} from "../../../storage/messages/messages";
import {User} from "../../../storage/models";

interface LoginProps {
    updateCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function Login({updateCurrentUser}: LoginProps) {
    function login() {
        const password = passwordRef?.current?.value;
        const username = usernameRef?.current?.value;
        if (!password || !username) return;

        const message = loginStorage({username: username, password: password});
        updateMessage(message);
        if (message === AuthMessages.OK) {
            updateCurrentUser(getAuthUser());
        }
    }

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);
    const [message, updateMessage] = useState<AuthMessages>(AuthMessages.OK)
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.loginHeader}>
                    Войти в аккаунт
                </h1>
                <form onSubmit={e => {
                    e.preventDefault();
                    login();
                }}>
                    <label className={styles.loginInput}>
                        Username
                        <input ref={usernameRef}/>
                    </label>
                    <label className={styles.loginInput}>
                        Пароль
                        <input ref={passwordRef}/>
                    </label>
                    <label className={styles.loginInput}>
                        Комната
                        <input ref={roomRef}/>
                    </label>
                    {message !== AuthMessages.OK && <p className={styles.loginMessage}>{messages[message]}</p>}
                    <button type="submit" className={styles.loginSubmit}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}