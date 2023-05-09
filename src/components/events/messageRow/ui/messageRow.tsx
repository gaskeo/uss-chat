import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "../../../kit";

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
}


export default function MessageRow({
                                       replyMessage,
                                       id,
                                       onReply,
                                       name,
                                       time,
                                       message,
                                       myMessage
                                   }: MessageRowProps) {
    return (
        <div className={styles.messageContainer}>
            <div className={`${styles.avatarContainer} ${myMessage ? styles.right : ""}`}>
                <Avatar background="#888" foreground="#000" letter={name[0]}/>
            </div>
            <div className={`${styles.messageRowContainer} ${myMessage ? styles.myMessage : ""}`}>
                <div className={styles.messageHeader}>
                    <Text color="accent">{name}</Text>
                    <Text color="secondary" size="s">{new Date(Number(time)).toLocaleString("ru-RU")}</Text>
                </div>

                {replyMessage &&
                    <div className={styles.reply}>
                        <Text size="s" color="secondary">{replyMessage.name}</Text>
                        <Text size="s" color="secondary">{replyMessage.message}</Text>
                    </div>
                }
                <Text>{message}</Text>
                <span onClick={() => onReply && onReply(id)} className={styles.replyText}><Text color="link"
                                                                                                size="s">Ответить</Text></span>
            </div>
        </div>
    )
}