import styles from "../styles/avatar.module.css";
import {Avatar} from "../index";
import React from "react";
import {AvatarProps} from "./avatar";

interface AvatarListProps {
    avatars: AvatarProps[]
}

export function AvatarList({avatars}: AvatarListProps) {
    return (
        <div className={styles.avatarList}>
            {avatars.map(avatar => (
                <Avatar
                    key={avatar.letter + avatar.background + avatar.foreground}
                    background={avatar.background} foreground={avatar.foreground}
                     letter={avatar.letter}/>
            ))}
        </div>
    )
}