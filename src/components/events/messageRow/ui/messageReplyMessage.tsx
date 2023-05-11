import styles from "../styles/messageRow.module.css";
import {Text} from "../../../kit";
import React from "react";

interface MessageReplyMessageProps {
    replyMessageAuthor: string | undefined;
    replyMessageText: string | undefined;
}

export function MessageReplyMessage({replyMessageAuthor, replyMessageText}: MessageReplyMessageProps) {
    if (!replyMessageText || !replyMessageAuthor) return null;

    return (
        <div className={styles.messageReplyMessageContainer}>
            <Text size="s" color="link">{replyMessageAuthor}</Text>
            <Text size="s" color="secondary">{replyMessageText}</Text>
        </div>
    )
}
