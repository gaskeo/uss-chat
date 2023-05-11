import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "@/components/kit";
import React from "react";
import {MessageRowHeader} from "./messageRow.header";
import {MessageRowMediaData} from "./messageRow.mediaData";
import {MessageRowReplyMessage} from "./messageRow.replyMessage";
import {EventMessage} from "@/storage/models";

interface MessageRowProps {
    message: EventMessage;
    isMyMessage?: boolean;
    messageReplyMessage?: { name: string, id: string, message: string, imageName: string | undefined };

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
    console.log(messageReplyMessage)
    return (
        <div
            className={styles.messageRowContainer}
            onContextMenuCapture={onReplyInner}
        >
            <div className={`${styles.messageRowAvatarContainer} ${isMyMessage && styles.myAvatarContainer}`}>
                <Avatar background={userColor} foreground="#000" letter={messageAuthorName[0]}/>
            </div>
            <div className={`${styles.messageContainer} ${isMyMessage && styles.myMessage}`}>
                <MessageRowHeader author={messageAuthorName} timestamp={message.time}/>
                <MessageRowMediaData
                    media={message.media}
                    onImageClick={onImageClick}
                />
                <MessageRowReplyMessage
                    replyMessageImageName={messageReplyMessage?.imageName}
                    replyMessageAuthor={messageReplyMessage?.name}
                    replyMessageText={messageReplyMessage?.message}
                />
                <Text pre>{message.message}</Text>
            </div>
        </div>
    )
}
