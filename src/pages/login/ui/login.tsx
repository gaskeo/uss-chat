import React, {useRef, useState} from "react";
import styles from "../styles/login.module.css";
import {getAuthUser, getRooms, login as loginStorage, selectRoom} from "../../../storage";
import {AuthMessages, messages} from "../../../storage/messages/messages";
import {User} from "../../../storage/models";

interface LoginProps {
    updateCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function Login({updateCurrentUser}: LoginProps) {
    function login() {
        const password = passwordRef?.current?.value;
        const username = usernameRef?.current?.value;
        const roomId = roomRef?.current?.value;
        if (!password || !username) return;

        const message = loginStorage({username: username, password: password});
        updateMessage(message);
        if (message === AuthMessages.OK) {
            selectRoom(roomId !== "new" ? roomId : undefined);
            return updateCurrentUser(getAuthUser());
        }
    }

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLSelectElement>(null);
    const [message, updateMessage] = useState<AuthMessages>(AuthMessages.OK)
    const rooms = getRooms();
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
                        <select ref={roomRef}>
                            <option value="new">Новая комната</option>
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                        </select>
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