import {getTimeHHMM} from "../../../../utils";
import styles from "../styles/messageRow.module.css";
import {Text} from "../../../kit";
import React from "react";

interface MessageHeaderProps {
    author: string;
    timestamp: string;
}

export function MessageHeader({author, timestamp}: MessageHeaderProps) {
    const timeHHMM = getTimeHHMM(new Date(Number(timestamp)));
    return (
        <div className={styles.messageHeader}>
            <Text color="link" size="m">{author}</Text>
            <Text color="secondary" size="s">{timeHHMM}</Text>
        </div>
    )
}
