import {getRoom, getUserPublic, setName} from "../../../../storage";
import styles from "../styles/roomPopup.module.css";
import {Button, Header, Input, Text} from "../../../kit";
import React, {useRef} from "react";
import {Room} from "../../../../storage/models";

interface RoomPopupProps {
    roomId: string;
    updateRoom: React.Dispatch<React.SetStateAction<Room | null>>
    onClose: () => void;
}

export default function RoomPopup({roomId, updateRoom, onClose}: RoomPopupProps) {
    function changeName() {
        if (nameRef?.current?.value.trim()) {
            setName(roomId, nameRef?.current?.value.trim());
            updateRoom(getRoom(roomId));
        }
    }

    const room = getRoom(roomId);
    const nameRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <div className={styles.background} onClick={() => onClose()}/>

            <div className={styles.roomPopupContainer}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    changeName();
                }}>
                    <div>
                        <Header>Название комнаты</Header>
                        <Input value={room?.name} inputRef={nameRef}/>
                    </div>
                    <Button color="success" type="submit">Изменить</Button>
                </form>
                <Header>Участники</Header>
                <div>
                    {room?.users.map(u => {
                        const user = getUserPublic(u);
                        return <Text>{user?.name}</Text>
                    })}
                </div>
            </div>
        </>
    )
}