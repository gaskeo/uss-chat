import styles from "../styles/messageRow.module.css";
import {Text} from "../../../kit";

interface MessageRowProps {
    id: string
    username: string;
    name: string;
    time: string;
    message: string
    media?: string[]
    replyMessage?: { name: string, id: string, message: string };
}


export default function MessageRow({username, name, time, message}: MessageRowProps) {
    return (
        <div className={styles.messageRowContainer}>
            <div className={styles.messageHeader}>
                <Text>{name}</Text>
                <Text type="secondary">{new Date(Number(time)).toLocaleString("ru-RU")}</Text>
            </div>
            <Text>{message}</Text>
        </div>
    )
}