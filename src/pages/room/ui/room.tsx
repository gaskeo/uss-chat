import styles from "../styles/room.module.css";
import React, {useEffect, useState} from "react";
import {addEvent, getRoom, getEvents, uploadImage} from "../../../storage";
import {EventMessage, EventTypes} from "../../../storage/models";
import RoomPopup from "../../../components/popups/roomPopup";
import {MessageInput} from "../../../components/messageInput";
import {ChatHeader} from "./room.chatHeader";
import {ImagePopup} from "../../../components/popups/imagePopup";
import {ChatContent} from "./room.chatContent";

interface RoomProps {
    roomId: string;
}

function subscribeOnStorage(onEvent: () => void) {
    window.addEventListener('storage', function (event) {
        if (event.storageArea === localStorage) {
            onEvent();
        }
    });
}

export default function Room({roomId}: RoomProps) {
    async function sendMessage(message: string,
                               replyId: string | undefined,
                               files: File[] | undefined
    ) {
        if (!message.length && !files?.length) {
            return
        }
        const media: string[] = [];

        if (files) {
            media.push(...await Promise
                .all(files.slice(0, 5)
                    .map(file => uploadImage(file))))
        }

        addEvent(roomId, {
            type: EventTypes.MESSAGE,
            message,
            replyId: replyId, media: media
        })
        updateEvents(getEvents(roomId))
        updateReplyMessageId('');
    }

    const [events, updateEvents] = useState(getEvents(roomId));
    const [room, updateRoom] = useState(getRoom(roomId));
    const [replyMessageId, updateReplyMessageId] = useState("");
    const [roomPopupOpen, updateRoomPopupOpen] = useState(false);
    const [imagePopupSrc, updateImagePopupSrc] = useState<string>("");

    const replyMessage = events.filter(e => (e.type === EventTypes.MESSAGE && e.id === replyMessageId))[0];

    useEffect(() => {
        subscribeOnStorage(() => updateEvents(getEvents(roomId)));
    }, [roomId]);

    return (
        <div className={styles.roomContainer}>
            {imagePopupSrc?.length > 0 && (
                <ImagePopup
                    src={imagePopupSrc}
                    onClose={() => updateImagePopupSrc("")}
                />
            )}
            {roomPopupOpen && (
                <RoomPopup
                    roomId={roomId}
                    updateRoom={updateRoom}
                    onClose={() => updateRoomPopupOpen(false)}/>
            )}

            <div className={styles.chatContainer}>
                <ChatHeader
                    onMoreClick={() => updateRoomPopupOpen(true)}
                    roomName={room?.name}
                    usernames={room?.users}
                />

                <ChatContent
                    events={events}
                    onImageClick={updateImagePopupSrc}
                    onReplyClick={updateReplyMessageId}
                />

                <MessageInput
                    onSendMessage={sendMessage}
                    replyMessage={replyMessage as EventMessage}
                    onCancelReplyMessage={() => updateReplyMessageId("")}
                />
            </div>
        </div>
    );
}
