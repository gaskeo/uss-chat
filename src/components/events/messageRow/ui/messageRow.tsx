import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "../../../kit";
import {getTimeHHMM} from "../../../../utils";
import {useState} from "react";

interface MessageRowProps {
    id: string
    username: string;
    name: string;
    time: string;
    message: string
    media?: string[]
    replyMessage?: { name: string, id: string, message: string };
    myMessage?: boolean;
    onReply?: (id: string) => void;
    color: string
}

export default function MessageRow({
                                       replyMessage,
                                       id,
                                       onReply,
                                       name,
                                       time,
                                       message,
                                       myMessage,
                                       color
                                   }: MessageRowProps) {
    return (
        <div className={styles.messageContainer} onContextMenuCapture={e => {
            e.preventDefault()
            onReply && onReply(id);
        }}>
            <div className={`${styles.avatarContainer} ${myMessage ? styles.right : ""}`}>
                <Avatar background={color} foreground="#000" letter={name[0]}/>
            </div>
            <div className={`${styles.messageRowContainer} ${myMessage ? styles.myMessage : ""}`}>
                <div className={styles.messageHeader}>
                    <Text color="accent">{name}</Text>
                    <Text color="secondary" size="s">{getTimeHHMM(new Date(Number(time)))}</Text>
                </div>

                {replyMessage &&
                    <div className={styles.reply}>
                        <Text size="s" color="secondary">{replyMessage.name}</Text>
                        <Text size="s" color="secondary">{replyMessage.message}</Text>
                    </div>
                }
                <Text>{message}</Text>
            </div>
        </div>
    )
}