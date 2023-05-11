import styles from "../styles/messageRow.module.css";
import {Text} from "../../../kit";
import React, {useEffect, useRef} from "react";
import {getImage} from "src/storage";

interface MessageReplyMessageProps {
    replyMessageAuthor?: string;
    replyMessageText?: string;
    replyMessageImageName?: string;
}

export function MessageRowReplyMessage({
                                        replyMessageAuthor,
                                        replyMessageText,
                                        replyMessageImageName
                                    }: MessageReplyMessageProps) {
    const replyImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!replyMessageImageName) return;
        getImage(replyMessageImageName).then(blob => {
            if (replyImageRef?.current) {
                replyImageRef.current.src = blob || "";
            }
        })
    })

    if (!replyMessageText && !replyMessageAuthor && !replyMessageImageName) return null;
    return (
        <div className={styles.messageReplyMessageContainer}>
            {replyMessageImageName && <div className={styles.messageReplyMessageImage}><img alt="" ref={replyImageRef}/></div>}
            <div>
                <Text size="s" color="link">{replyMessageAuthor}</Text>
                <Text size="s" color="secondary">{replyMessageText}</Text>
            </div>
        </div>
    )
}
