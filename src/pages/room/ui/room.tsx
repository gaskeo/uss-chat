import styles from "../styles/room.module.css";
import React, {useEffect, useRef, useState} from "react";
import {addEvent, getAuthUser, getRoom, getRoomEvents, getUserPublic} from "../../../storage";
import {EventTypes} from "../../../storage/models";
import {JoinRow} from "../../../components";
import {Button, Header, Input} from "../../../components/kit";
import MessageRow from "../../../components/events/messageRow";

interface RoomProps {
    roomId: string;
}

export default function Room({roomId}: RoomProps) {
    window.addEventListener('storage', function (event) {
        if (event.storageArea === localStorage) {
            updateEvents(getRoomEvents(roomId));
        }
    });

    function sendMessage() {
        const message = inputMessageRef?.current?.value;
        if (!message || message.length < 1) {
            return
        }
        addEvent(roomId, {
            type: EventTypes.MESSAGE,
            message
        })
        updateEvents(getRoomEvents(roomId))
        inputMessageRef.current.value = "";
    }

    const [events, updateEvents] = useState(getRoomEvents(roomId));

    useEffect(() => {
        chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight)

    }, [events])

    const room = getRoom(roomId);

    const inputMessageRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const currentUser = getAuthUser();

    return (
        <div className={styles.roomContainer}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <Header>{room?.name}</Header>
                    <p>Пользователей в комнате: {room?.users?.length}</p>
                </div>
                <div className={styles.chatContent} ref={chatRef}>
                    {events.map(e => {
                        const user = getUserPublic(e.user);
                        switch (e.type) {
                            case EventTypes.JOIN:
                                return <JoinRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                />
                            case EventTypes.MESSAGE:
                                return <MessageRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                    message={e.message}
                                    id={e.id}
                                    myMessage={e.user === currentUser?.username}
                                />
                            default:
                                return <div></div>
                        }
                    })}
                </div>

                <form className={styles.inputContainer} onSubmit={e => {
                    e.preventDefault();
                    sendMessage();
                }}>
                    <Input inputRef={inputMessageRef}/>
                    <Button color="success" type="submit">отправить</Button>
                </form>
            </div>
        </div>
    );
}