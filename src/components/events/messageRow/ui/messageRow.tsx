import styles from "../styles/messageRow.module.css";
import {Avatar, Text} from "../../../kit";
import {getTimeHHMM} from "../../../../utils";
import {getImage} from "../../../../storage/media/save";
import {useEffect, useRef} from "react";

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
                                       color,
                                       media
                                   }: MessageRowProps) {
    const imgContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (media?.length && imgContainerRef?.current)
            media.map((name, index) => getImage(name).then(content => {
                    if (imgContainerRef?.current) {
                        const ref: HTMLImageElement = imgContainerRef.current.children[index] as HTMLImageElement;
                        if (ref) {
                            ref.src = content || "";
                        }
                    }
                })
            );
    })
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
                    <Text color="link">{name}</Text>
                    <Text color="secondary" size="s">{getTimeHHMM(new Date(Number(time)))}</Text>
                </div>
                {
                    media &&
                    <div ref={imgContainerRef} className={styles.imageContainer} data-items={media.length}>
                        {media.map((name) => (
                            <img key={name} alt="" className={styles.image}/>))}
                    </div>
                }
                {replyMessage?.message &&
                    <div className={styles.reply}>
                        <Text size="s" color="link">{replyMessage.name}</Text>
                        <Text size="s" color="secondary">{replyMessage.message}</Text>
                    </div>
                }
                <Text pre>{message}</Text>
            </div>
        </div>
    )
}