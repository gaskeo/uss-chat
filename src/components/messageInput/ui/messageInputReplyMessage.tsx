import styles from "../styles/messageInput.module.css";
import {Text} from "../../kit";
import React from "react";

interface ReplyMessageProps {
    message?: string;
    author?: string;
    onCancel?: () => void;
}

export function MessageInputReplyMessage({message, author, onCancel}: ReplyMessageProps) {
    if (!message) return null;

    return (
        <div className={styles.messageReplyMessageContainer}>
            <div className={styles.replyMessageContent}>
                <Text color="link" size="s">{author}</Text>
                <Text color="secondary" size="s">{message}</Text>
            </div>
            <div className={styles.replyMessageCloseButton} onClick={onCancel}/>
        </div>
    )
}
