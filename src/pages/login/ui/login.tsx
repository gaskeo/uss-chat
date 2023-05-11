import React, {useRef, useState} from "react";
import styles from "../styles/login.module.css";
import {getAuthUser, getCurrentRoom, getRooms, login as loginStorage, selectRoom} from "../../../storage";
import {AuthMessages, messages, SystemMessages} from "../../../storage/messages/messages";
import {Room, User} from "../../../storage/models";
import {Link, useNavigate} from "react-router-dom";
import {Button, Header, Input, Select, Text, Error} from "../../../components/kit";

interface LoginProps {
    updateCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
    updateCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

export default function Login({updateCurrentUser, updateCurrentRoom}: LoginProps) {
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login();
    }

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
        }
    }

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLSelectElement>(null);
    const [message, updateMessage] = useState<AuthMessages | SystemMessages>(AuthMessages.OK)
    const rooms = getRooms();

    const roomSelectItems = [
        {value: "new", label: "Новая комната"},
        ...rooms.map(room => ({value: room.id, label: room.name}))
    ]

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Header>
                    Войти в аккаунт
                </Header>
                <form onSubmit={onSubmit}>
                    <Input label="Username" inputRef={usernameRef}/>
                    <Input label="Пароль" inputRef={passwordRef} type="password"/>
                    <Select label="Комната"
                            selectRef={roomRef}
                            items={roomSelectItems}
                    />
                    {message !== AuthMessages.OK && <Error message={messages[message]}/>}
                    <Button type="submit" color="success">Войти</Button>
                    <Link to="/register"><Text color="secondary">Ещё нет аккаунта</Text></Link>
                </form>
            </div>
        </div>
    )
}