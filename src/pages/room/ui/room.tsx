import styles from "../styles/room.module.css";
import React from "react";
import {getRoom, getRoomEvents} from "../../../storage";
import {EventTypes} from "../../../storage/models";

interface RoomProps {
    roomId: string;
}

export default function Room({roomId}: RoomProps) {
    const events = getRoomEvents(roomId);
    const room = getRoom(roomId);
    return (
        <div className={styles.roomContainer}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <h1>{room?.name}</h1>
                    <p>Пользователей в комнате: {room?.users?.length}</p>
                </div>
                <div className={styles.chatContent}>
                    {events.map(e => {
                        switch (e.type) {
                            case EventTypes.JOIN:
                                return <div key={e.time + e.type}>connect: {e.user}</div>
                            default:
                                return <div></div>
                        }
                    })}
                </div>
            </div>
        </div>
    );
}