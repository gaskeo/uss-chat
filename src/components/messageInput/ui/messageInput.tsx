import styles from "../styles/messageInput.module.css";
import {Button, Input, Text} from "../../kit";
import React, {useRef} from "react";

interface MessageInputProps {
    onSendMessage: (message: string, replyId: string | undefined, files: File[] | undefined) => void;
    replyMessage: { user: string, message: string, id: string } | undefined
    onCancelReplyMessage: () => void;
}

function ReplyMessage({message, user, onCancel}: { message: string, user: string, onCancel: () => void }) {
    return (
        <div className={styles.replyMessageContainer}>
            <div className={styles.replyMessage}>
                <Text color="invert" size="s">{user}</Text>
                <Text color="invert" size="s">{message}</Text>
            </div>
            <div className={styles.closeButton} onClick={onCancel}/>
        </div>
    )
}

export default function MessageInput({onSendMessage, replyMessage, onCancelReplyMessage}: MessageInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    return (
        <form className={styles.inputContainer} onSubmit={e => {
            e.preventDefault();
            const files = fileRef?.current?.files;
            onSendMessage(inputRef?.current?.value || "", replyMessage?.id, files?.length ? Array.from(files) : undefined);
            if (inputRef?.current) inputRef.current.value = "";
            if (fileRef?.current) fileRef.current.files = null;
        }}>
            {replyMessage &&
                <ReplyMessage message={replyMessage.message} user={replyMessage.user} onCancel={onCancelReplyMessage}/>

            }
            <div className={styles.input}>
                <Input inputRef={inputRef}/>
                <input type="file" ref={fileRef} multiple/>
                <Button color="success" type="submit">отправить</Button>
            </div>
        </form>
    )
}