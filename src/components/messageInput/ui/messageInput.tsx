import styles from "../styles/messageInput.module.css";
import {Input, Text} from "../../kit";
import React, {useRef, useState} from "react";
import {Send} from "../../kit/icons";
import {Attach} from "../../kit/icons";
import {loadImagePreview} from "../../../utils";

interface MessageInputProps {
    onSendMessage: (message: string, replyId: string | undefined, files: File[] | undefined) => void;
    replyMessage: { user: string, message: string, id: string } | undefined
    onCancelReplyMessage: () => void;
}

function ReplyMessage({message, user, onCancel}: { message: string, user: string, onCancel: () => void }) {
    return (
        <div className={styles.replyMessageContainer}>
            <div className={styles.replyMessage}>
                <Text color="link" size="s">{user}</Text>
                <Text color="secondary" size="s">{message}</Text>
            </div>
            <div className={styles.closeButton} onClick={onCancel}/>
        </div>
    )
}

export default function MessageInput({onSendMessage, replyMessage, onCancelReplyMessage}: MessageInputProps) {
    function loadPreviews() {
        const files = fileRef?.current?.files;
        if (files?.length) {
            Promise.all(Array.from(files).slice(0, 5)
                .map(f => loadImagePreview(f)
                    .then(src => ({src: src, file: f}))))
                .then((n) => updateSelectedFiles([...selectedFiles, ...n]))
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [selectedFiles, updateSelectedFiles] = useState<{ file: File, src: string }[]>([]);

    return (
        <form className={styles.inputContainer} onSubmit={e => {
            e.preventDefault();
            const files = selectedFiles.map(f => f.file);
            onSendMessage(inputRef?.current?.value || "", replyMessage?.id, files?.length ? Array.from(files) : undefined);
            if (inputRef?.current) inputRef.current.value = "";
            if (fileRef?.current) fileRef.current.files = null;
            updateSelectedFiles([]);
        }}>
            {replyMessage &&
                <ReplyMessage message={replyMessage.message} user={replyMessage.user} onCancel={onCancelReplyMessage}/>

            }
            <div className={styles.input}>
                <Input inputRef={inputRef}/>
                <label className={styles.fileInput}>
                    <Attach/>
                    <input type="file" ref={fileRef} multiple onInput={loadPreviews}/>
                </label>
                <div className={styles.sendButton}>
                    <Send/>
                </div>
            </div>
            {
                selectedFiles.length > 0 && (
                    <div className={styles.selectedFilesContainer}>
                        {selectedFiles.map(f =>
                            <div><img onClick={() => updateSelectedFiles(selectedFiles.filter(o => f !== o))} key={f.src.slice(0, 6)} alt="" src={f.src}/></div>)}
                    </div>
                )
            }
        </form>
    )
}