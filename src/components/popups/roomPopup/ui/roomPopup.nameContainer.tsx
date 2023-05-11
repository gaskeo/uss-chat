import React, {RefObject} from "react";
import {Button, Header, Input} from "../../../kit";

interface RoomPopupNameContainerProps {
    onChangeName?: () => void;
    nameInputRef: RefObject<HTMLInputElement>;
    currentName?: string;
}

export function RoomPopupNameContainer({onChangeName, nameInputRef, currentName}: RoomPopupNameContainerProps) {
    function onChangeNameInner(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (onChangeName) onChangeName();
    }

    return (
        <form onSubmit={onChangeNameInner}>
            <div>
                <Header>Название комнаты</Header>
                <Input defaultValue={currentName} inputRef={nameInputRef}/>
            </div>
            <Button color="success" type="submit">Изменить</Button>
        </form>
    )
}
