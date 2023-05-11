import styles from "../styles/roomPopup.module.css";
import {Avatar, Header, Text} from "@/components/kit";
import {getUserPublic} from "@/storage";
import React from "react";

interface RoomPopupMembersProps {
    usernames?: string[];
}

export function RoomPopupMembers({usernames}: RoomPopupMembersProps) {
    if (!usernames?.length) return null;

    return (
        <div className={styles.userDataContainer}>
            <Header>Участники</Header>
            <div className={styles.userRowContainer}>
                {usernames.map(username => {
                    const user = getUserPublic(username);
                    return <MemberRow name={user?.name} color={user?.color}/>
                })}
            </div>
        </div>
    )
}


interface MemberRowProps {
    name?: string;
    color?: string;
}

function MemberRow({name, color}: MemberRowProps) {
    return (
        <div className={styles.userRow}>
            <Avatar background={color || ""} foreground="#000" letter={name?.[0]}/>
            <Text>{name}</Text>
        </div>
    )
}