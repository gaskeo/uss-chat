import styles from "../styles/room.module.css";
import React, {useEffect, useRef, useState} from "react";
import {addEvent, getAuthUser, getRoom, getRoomEvents, getUserPublic} from "../../../storage";
import {EventMessage, EventTypes} from "../../../storage/models";
import {JoinRow} from "../../../components";
import {Button, Header, Input, Text} from "../../../components/kit";
import MessageRow from "../../../components/events/messageRow";
import RoomPopup from "../../../components/popups/roomPopup";

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
            message,
            replyId: replyMessageId || undefined
        })
        updateEvents(getRoomEvents(roomId))
        updateReplyMessageId('');
        inputMessageRef.current.value = "";
    }

    const [events, updateEvents] = useState(getRoomEvents(roomId));
    const [room, updateRoom] = useState(getRoom(roomId));
    const inputMessageRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const currentUser = getAuthUser();
    const [replyMessageId, updateReplyMessageId] = useState("");
    const replyMessage = events.filter(e => (e.type === EventTypes.MESSAGE && e.id === replyMessageId))[0];
    const [popupOpen, updatePopupOpen] = useState(false);

    useEffect(() => {
        chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight)
    }, [events])

    return (
        <div className={styles.roomContainer}>
            {popupOpen && <RoomPopup roomId={roomId} updateRoom={updateRoom} onClose={() => updatePopupOpen(false)}/>}
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader} onClick={() => updatePopupOpen(true)}>
                    <Header>{room?.name}</Header>
                    <p>Участников: {room?.users?.length}</p>
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
                                const replyMessage = events.filter(message => (message.type === EventTypes.MESSAGE && message.id === e.replyId))[0] as EventMessage;
                                return <MessageRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                    message={e.message}
                                    id={e.id}
                                    replyMessage={{
                                        message: replyMessage?.message,
                                        name: getUserPublic(replyMessage?.user)?.name || "",
                                        id: replyMessage?.id
                                    }}

                                    onReply={(id) => updateReplyMessageId(id)}
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
                    {replyMessage && replyMessage.type === EventTypes.MESSAGE &&
                        <span>
                            <Text color="invert">{replyMessage.user}: {replyMessage.message}</Text>
                            <div onClick={() => updateReplyMessageId("")}><Text color="invert">Отменить</Text></div>
                        </span>
                    }
                    <div>
                        <Input inputRef={inputMessageRef}/>
                        <Button color="success" type="submit">отправить</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}