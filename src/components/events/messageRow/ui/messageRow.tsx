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
    myMessage?: boolean
}


export default function MessageRow({username, name, time, message, myMessage}: MessageRowProps) {
    console.log(myMessage)
    return (
        <div className={`${styles.messageRowContainer} ${myMessage ? styles.myMessage : ""}`} data-avatar={name[0]}>
            <div className={styles.avatar}/>
            <div className={styles.messageHeader}>
                <Text>{name}</Text>
                <Text color="secondary">{new Date(Number(time)).toLocaleString("ru-RU")}</Text>
            </div>
            <Text>{message}</Text>
        </div>
    )
}