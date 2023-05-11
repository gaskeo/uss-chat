import styles from "../styles/messageInput.module.css";
import {Text} from "src/components/kit";
import React, {useEffect, useRef} from "react";
import {getImage} from "src/storage";

interface ReplyMessageProps {
    message?: string;
    imageName?: string;
    author?: string;
    onCancel?: () => void;
}

export function MessageInputReplyMessage({message, imageName, author, onCancel}: ReplyMessageProps) {

    useEffect(() => {
        if (!imageName) return;

        getImage(imageName).then(blob => {
            if (replyMediaRef?.current) {
                replyMediaRef.current.src = blob || "";
            }
        })
    })

    const replyMediaRef = useRef<HTMLImageElement>(null);
    if (!message && !imageName) return null;

    return (
        <div className={styles.messageReplyMessageContainer}>
            <div className={styles.replyMessageContent}>
                {imageName && <div className={styles.messageReplyImage}><img alt="" ref={replyMediaRef}/></div>}
                <div>
                    <Text color="link" size="s">{author}</Text>
                    <Text color="secondary" size="s">{message}</Text>
                </div>
            </div>
            <div className={styles.replyMessageCloseButton} onClick={onCancel}/>
        </div>
    )
}
