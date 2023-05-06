import styles from "../styles/room.module.css";
import React, {useRef, useState} from "react";
import {addEvent, getRoom, getRoomEvents, getUserPublic} from "../../../storage";
import {EventTypes} from "../../../storage/models";
import {JoinRow} from "../../../components";
import {Header} from "../../../components/kit";

interface RoomProps {
    roomId: string;
}

export default function Room({roomId}: RoomProps) {
    window.addEventListener('storage', function(event){
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
    }

    const [events, updateEvents] = useState(getRoomEvents(roomId));
    const room = getRoom(roomId);

    const inputMessageRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.roomContainer}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <Header>{room?.name}</Header>
                    <p>Пользователей в комнате: {room?.users?.length}</p>
                </div>
                <div className={styles.chatContent}>
                    {events.map(e => {
                        switch (e.type) {
                            case EventTypes.JOIN:
                                const user = getUserPublic(e.user);
                                return <JoinRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                />
                            case EventTypes.MESSAGE:
                                return <div>{e.message}</div>
                            default:
                                return <div></div>
                        }
                    })}
                    <form onSubmit={e => {
                        e.preventDefault();
                        sendMessage();
                    }}>
                        <input ref={inputMessageRef}/>
                        <button type="submit">отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}