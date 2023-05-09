import styles from "../../../pages/room/styles/room.module.css";
import {EventTypes} from "../../../storage/models";
import {Button, Input, Text} from "../../kit";
import React, {RefObject, useRef} from "react";

interface MessageInputProps {
    onSendMessage: (message: string, replyId: string | undefined) => void;
    replyMessage: { user: string, message: string, id: string } | undefined
    onCancelReplyMessage: () => void;
}

export default function MessageInput({onSendMessage, replyMessage, onCancelReplyMessage}: MessageInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className={styles.inputContainer} onSubmit={e => {
            e.preventDefault();
            onSendMessage(inputRef?.current?.value || "", replyMessage?.id);
        }}>
            {replyMessage &&
                <span>
                            <Text color="invert">{replyMessage.user}: {replyMessage.message}</Text>
                            <div onClick={() => onCancelReplyMessage()}><Text color="invert">Отменить</Text></div>
                        </span>
            }
            <div>
                <Input inputRef={inputRef}/>
                <Button color="success" type="submit">отправить</Button>
            </div>
        </form>
    )
}