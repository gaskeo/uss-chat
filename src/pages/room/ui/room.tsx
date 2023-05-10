import styles from "../styles/room.module.css";
import React, {useEffect, useRef, useState} from "react";
import {addEvent, getAuthUser, getRoom, getRoomEvents, getUserPublic} from "../../../storage";
import {EventMessage, EventTypes} from "../../../storage/models";
import {JoinRow} from "../../../components";
import {Avatar, Header} from "../../../components/kit";
import MessageRow from "../../../components/events/messageRow";
import RoomPopup from "../../../components/popups/roomPopup";
import {MessageInput} from "../../../components/messageInput";
import DateRow from "../../../components/events/dateRow";
import {loadImage} from "../../../storage/media/save";
import {Dots} from "../../../components/kit/icons";

interface RoomProps {
    roomId: string;
}

export default function Room({roomId}: RoomProps) {
    window.addEventListener('storage', function (event) {
        if (event.storageArea === localStorage) {
            updateEvents(getRoomEvents(roomId));
        }
    });

    async function sendMessage(message: string, replyId: string | undefined, files: File[] | undefined) {
        if (!message || message.length < 1) {
            return
        }
        const media: string[] = [];
        if (files) {
            const fileNames = await Promise.all(files.slice(0, 5).map(file => loadImage(file)));
            media.push(...fileNames)
        }

        addEvent(roomId, {
            type: EventTypes.MESSAGE,
            message,
            replyId: replyId, media: media
        })
        updateEvents(getRoomEvents(roomId))
        updateReplyMessageId('');
    }

    const [events, updateEvents] = useState(getRoomEvents(roomId));
    const [room, updateRoom] = useState(getRoom(roomId));
    const chatRef = useRef<HTMLDivElement>(null);
    const currentUser = getAuthUser();
    const [replyMessageId, updateReplyMessageId] = useState("");
    const replyMessage = events.filter(e => (e.type === EventTypes.MESSAGE && e.id === replyMessageId))[0];
    const [popupOpen, updatePopupOpen] = useState(false);
    const [imagePopup, updateImagePopup] = useState<React.ReactNode>(null);

    useEffect(() => {
        chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight)
    }, [events])
    return (
        <div className={styles.roomContainer}>
            {imagePopup}
            {popupOpen && <RoomPopup roomId={roomId} updateRoom={updateRoom} onClose={() => updatePopupOpen(false)}/>}
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderNameSection}>
                        <Header>{room?.name}</Header>
                        <div onClick={() => updatePopupOpen(true)}><Dots/></div>
                    </div>
                    <div className={styles.chatHeaderUserContainer}>
                        {room?.users.slice(0, 5).map(u => {
                            const user = getUserPublic(u);
                            return <Avatar key={user?.username} background={user?.color || ""} foreground="000"
                                           letter={user?.name[0] || ""}/>
                        })}
                    </div>
                </div>
                <div className={styles.chatContent} ref={chatRef}>
                    {events.map(e => {
                        let user;
                        switch (e.type) {
                            case EventTypes.DATE:
                                return <DateRow key={e.id} time={e.time}/>
                            case EventTypes.JOIN:
                                user = getUserPublic(e.user);
                                return <JoinRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                />
                            case EventTypes.MESSAGE:
                                user = getUserPublic(e.user);
                                const replyMessage = events.filter(message => (message.type === EventTypes.MESSAGE && message.id === e.replyId))[0] as EventMessage;
                                return <MessageRow
                                    key={e.time + e.type}
                                    time={e.time}
                                    username={e.user}
                                    name={user?.name || ""}
                                    message={e.message}
                                    media={e.media}
                                    id={e.id}
                                    updateImagePopup={updateImagePopup}
                                    color={user?.color || ""}
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
                <MessageInput
                    onSendMessage={sendMessage}
                    replyMessage={replyMessage as EventMessage}
                    onCancelReplyMessage={() => updateReplyMessageId("")}
                />

            </div>
        </div>
    );
}