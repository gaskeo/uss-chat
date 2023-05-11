import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "../../../kit";
import React from "react";
import {ImagePopup} from "../../../popups/imagePopup";
import {MessageHeader} from "./messageHeader";
import { MessageMediaData } from "./messageMediaData";
import {MessageReplyMessage} from "./messageReplyMessage";

interface MessageRowProps {
    messageId: string;
    messageText: string;
    messageMedia?: string[];
    messageReplyMessage?: { name: string, id: string, message: string };
    messageTimestamp: string;
    isMyMessage?: boolean;
    onReply?: (id: string) => void;
    updateImagePopup: (r: React.ReactNode) => void;

    username: string;
    name: string;
    userColor: string;
}

export default function MessageRow({
                                       messageReplyMessage,
                                       messageId,
                                       onReply,
                                       name,
                                       messageTimestamp,
                                       messageText,
                                       isMyMessage,
                                       userColor,
                                       messageMedia,
                                       updateImagePopup
                                   }: MessageRowProps) {
    function onReplyInner(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        if (onReply) onReply(messageId);
    }

    function onImageClick(src: string) {
        updateImagePopup(
            <ImagePopup
                onClose={() => updateImagePopup(null)}
                src={src}
            />
        )
    }

    return (
        <div
            className={styles.messageRowContainer}
            onContextMenuCapture={onReplyInner}
        >
            <div className={`${styles.messageRowAvatarContainer} ${isMyMessage && styles.myAvatarContainer}`}>
                <Avatar background={userColor} foreground="#000" letter={name[0].toUpperCase()}/>
            </div>
            <div className={`${styles.messageContainer} ${isMyMessage && styles.myMessage}`}>
                <MessageHeader author={name} timestamp={messageTimestamp}/>
                <MessageMediaData
                    media={messageMedia}
                    onImageClick={onImageClick}
                />
                <MessageReplyMessage
                    replyMessageAuthor={messageReplyMessage?.name}
                    replyMessageText={messageReplyMessage?.message}
                />
                <Text pre>{messageText}</Text>
            </div>
        </div>
    )
}
