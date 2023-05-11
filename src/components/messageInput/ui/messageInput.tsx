import styles from "../styles/messageInput.module.css";
import React, {useRef, useState} from "react";
import {getImageBlob} from "../../../utils";
import {FileStructure, MessageInputSelectedFiles} from "./messageInputSelectedFiles";
import {MessageInputRow} from "./messageInputRow";
import {MessageInputReplyMessage} from "./messageInputReplyMessage";
import {EventMessage} from "../../../storage/models";

interface MessageInputProps {
    onSendMessage: (message: string, replyId: string | undefined, files: File[] | undefined) => void;
    replyMessage?: EventMessage;
    onCancelReplyMessage: () => void;
}

export default function MessageInput({onSendMessage, replyMessage, onCancelReplyMessage}: MessageInputProps) {
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submit();
    }

    function submit() {
        const files = selectedFiles.map(f => f.file);
        console.log(replyMessage)
        onSendMessage(
            messageRef?.current?.value || "",
            replyMessage?.id,
            files?.length ? files : undefined
        );
        clearFields();
    }

    function clearFields() {
        if (messageRef?.current) messageRef.current.value = "";
        if (fileInputRef?.current) fileInputRef.current.files = null;
        updateSelectedFiles([]);
    }

    function onImageClick(clickedFile: FileStructure) {
        updateSelectedFiles(
            selectedFiles
                .filter(currentFile => clickedFile !== currentFile));
    }

    function updateSelectedFilesFunc() {
        const files = fileInputRef?.current?.files;
        if (files?.length) {
            Promise.all(Array.from(files).slice(0, 5)
                .map(f => getImageBlob(f)
                    .then(src => ({src: src, file: f}))))
                .then((n) => updateSelectedFiles([...selectedFiles, ...n]))
        }
    }

    const messageRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [
        selectedFiles,
        updateSelectedFiles
    ] = useState<FileStructure[]>([]);

    return (
        <form className={styles.messageInputContainer} onSubmit={onSubmit}>
            <MessageInputReplyMessage
                message={replyMessage?.message}
                author={replyMessage?.user}
                imageName={replyMessage?.media?.[0]}
                onCancel={onCancelReplyMessage}
            />

            <MessageInputRow
                textareaRef={messageRef}
                onSubmit={submit}
                fileInputRef={fileInputRef}
                onFileInput={updateSelectedFilesFunc}
            />

            <MessageInputSelectedFiles
                files={selectedFiles}
                onImageClick={onImageClick}
            />
        </form>
    )
}

