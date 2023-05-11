import {getUserPublic} from "src/storage";
import styles from "../styles/room.module.css";
import {AvatarList, Header} from "src/components/kit";
import {Dots} from "src/components/kit/icons";
import React from "react";

interface ChatHeaderProps {
    roomName?: string;
    onMoreClick?: () => void;
    usernames?: string[];
}

export function ChatHeader({roomName, usernames, onMoreClick}: ChatHeaderProps) {
    function getAvatars() {
        if (!usernames) return [];
        return usernames.slice(0, 5).map(username => {
            const user = getUserPublic(username);
            return {background: user?.color || "", foreground: "#000", letter: user?.name?.[0] || ""}
        })
    }

    return (
        <div className={styles.chatHeader}>
            <div className={styles.chatHeaderNameSection}>
                <Header>{roomName}</Header>
                <div onClick={onMoreClick}><Dots/></div>
            </div>
            <AvatarList avatars={getAvatars()}/>
        </div>
    )
}