import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "../../../kit";
import React from "react";
import {MessageHeader} from "./messageHeader";
import {MessageMediaData} from "./messageMediaData";
import {MessageReplyMessage} from "./messageReplyMessage";
import {EventMessage} from "../../../../storage/models";

interface MessageRowProps {
    message: EventMessage;
    isMyMessage?: boolean;
    messageReplyMessage?: { name: string, id: string, message: string };

    onReply?: (id: string) => void;
    updateImagePopupSrc: (src: string) => void;

    messageAuthorName: string;
    userColor: string;
}

export default function MessageRow({
                                       messageReplyMessage,
                                       onReply,
                                       messageAuthorName,
                                       isMyMessage,
                                       userColor,
                                       updateImagePopupSrc,
                                       message
                                   }: MessageRowProps) {
    function onReplyInner(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        if (onReply) onReply(message.id);
    }

    function onImageClick(src: string) {
        updateImagePopupSrc(src)
    }

    return (
        <div
            className={styles.messageRowContainer}
            onContextMenuCapture={onReplyInner}
        >
            <div className={`${styles.messageRowAvatarContainer} ${isMyMessage && styles.myAvatarContainer}`}>
                <Avatar background={userColor} foreground="#000" letter={messageAuthorName[0]}/>
            </div>
            <div className={`${styles.messageContainer} ${isMyMessage && styles.myMessage}`}>
                <MessageHeader author={messageAuthorName} timestamp={message.time}/>
                <MessageMediaData
                    media={message.media}
                    onImageClick={onImageClick}
                />
                <MessageReplyMessage
                    replyMessageAuthor={messageReplyMessage?.name}
                    replyMessageText={messageReplyMessage?.message}
                />
                <Text pre>{message.message}</Text>
            </div>
        </div>
    )
}
