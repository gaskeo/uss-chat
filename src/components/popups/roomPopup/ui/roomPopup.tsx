import {getRoom, setName} from "@/storage";
import styles from "../styles/roomPopup.module.css";
import React, {useRef} from "react";
import {Room} from "@/storage/models";
import {RoomPopupMembers} from "./roomPopup.members";
import {RoomPopupNameContainer} from "./roomPopup.nameContainer";

interface RoomPopupProps {
    roomId: string;
    updateRoom: React.Dispatch<React.SetStateAction<Room | null>>
    onClose: () => void;
}

export default function RoomPopup({roomId, updateRoom, onClose}: RoomPopupProps) {
    function onChangeName() {
        const newName = nameRef?.current?.value.trim()
        if (newName) {
            setName(roomId, newName);
            updateRoom(getRoom(roomId));
        }
    }

    const room = getRoom(roomId);
    const nameRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div className={styles.background} onClick={onClose}/>

            <div className={styles.roomPopupContainer}>
                <RoomPopupNameContainer
                    nameInputRef={nameRef}
                    currentName={room?.name}
                    onChangeName={onChangeName}
                />
                <RoomPopupMembers usernames={room?.users}/>
            </div>
        </>
    )
}
