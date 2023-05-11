import React, {RefObject} from "react";
import styles from "../styles/messageInput.module.css";
import {Textarea} from "../../kit/textarea";
import {Attach, Send} from "../../kit/icons";
import {Button} from "../../kit";

interface MessageInputRowProps {
    textareaRef: RefObject<HTMLTextAreaElement>;
    onSubmit: () => void;
    fileInputRef: RefObject<HTMLInputElement>;
    onFileInput: () => void;
}

export function MessageInputRow({textareaRef, onFileInput, fileInputRef, onSubmit}: MessageInputRowProps) {
    return (
        <div className={styles.inputRow}>
            <Textarea
                textareaRef={textareaRef}
                onSubmit={onSubmit}
                placeholder="Введите сообщение..."
            />
            <label className={styles.fileInputContainer}>
                <Attach/>
                <input
                    accept="image/png,image/jpeg"
                    type="file" ref={fileInputRef}
                    multiple
                    onInput={onFileInput}/>
            </label>
            <div className={styles.sendMessageButton}>
                <Button type="submit"><Send/></Button>
            </div>
        </div>
    )
}
