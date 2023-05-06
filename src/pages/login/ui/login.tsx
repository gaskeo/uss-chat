import React, {useRef, useState} from "react";
import styles from "../styles/login.module.css";
import {getAuthUser, getCurrentRoom, getRooms, login as loginStorage, register, selectRoom} from "../../../storage";
import {AuthMessages, messages, SystemMessages} from "../../../storage/messages/messages";
import {Room, User} from "../../../storage/models";
import {redirect, useNavigate} from "react-router-dom";
import {Button, Header, Input, Select} from "../../../components/kit";

interface LoginProps {
    updateCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
    updateCurrentRoom:  React.Dispatch<React.SetStateAction<Room | null>>
}

export default function Login({updateCurrentUser, updateCurrentRoom}: LoginProps) {
    function login() {
        const password = passwordRef?.current?.value;
        const username = usernameRef?.current?.value;
        const roomId = roomRef?.current?.value;
        if (!password || !username) return updateMessage(SystemMessages.FIELDS_NOT_FILL);

        const message = loginStorage({username: username, password: password});
        updateMessage(message);
        if (message === AuthMessages.OK) {
            selectRoom(roomId !== "new" ? roomId : undefined);
            updateCurrentUser(getAuthUser());
            updateCurrentRoom(getCurrentRoom());
            navigate("/room")
            console.log("redirect")
        }
    }
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLSelectElement>(null);
    const [message, updateMessage] = useState<AuthMessages | SystemMessages>(AuthMessages.OK)
    const rooms = getRooms();
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Header>
                    Войти в аккаунт
                </Header>
                <form onSubmit={e => {
                    e.preventDefault();
                    login();
                }}>
                    <Input label="Username" inputRef={usernameRef}/>
                    <Input label="Пароль" inputRef={passwordRef} type="password"/>
                    <Select label="Комната"
                            selectRef={roomRef}
                            items={[{value: "new", label: "Новая комната"}, ...rooms.map(r => ({value: r.name, label: r.name}))]}
                    />
                    {message !== AuthMessages.OK && <p className={styles.loginMessage}>{messages[message]}</p>}
                    <Button type="submit" color="success">Войти</Button>
                </form>
            </div>
        </div>
    )
}