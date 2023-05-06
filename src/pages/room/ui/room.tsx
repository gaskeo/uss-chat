import styles from "../styles/room.module.css";
import React from "react";
import {getRoom, getRoomEvents, getUserPublic} from "../../../storage";
import {EventTypes} from "../../../storage/models";
import {JoinRow} from "../../../components";
import {Header} from "../../../components/kit";

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
                            default:
                                return <div></div>
                        }
                    })}
                </div>
            </div>
        </div>
    );
}