import React, {RefObject, useRef, useState} from "react";
import styles from "../styles/messageInput.module.css";
import {Attach, Send} from "src/components/kit/icons";
import {Button, Textarea} from "src/components/kit";
import {codeToEmoji, emoji} from "../../../utils";

interface MessageInputRowProps {
    textareaRef: RefObject<HTMLTextAreaElement>;
    onSubmit: () => void;
    fileInputRef: RefObject<HTMLInputElement>;
    onFileInput: () => void;
}

export function MessageInputRow({
                                    textareaRef,
                                    onFileInput,
                                    fileInputRef,
                                    onSubmit,
                                }: MessageInputRowProps) {
    function onSubmitInner() {
        onSubmit();
        updateEmojiOpen(false);
    }

    function insertEmoji(code: string) {
        if (textareaRef?.current) {
            const currentString = textareaRef.current.value;
            const cursorPosition = textareaRef.current.selectionStart;
            const emoji = codeToEmoji(code)
            textareaRef.current.value = currentString.slice(0, cursorPosition) + emoji + currentString.slice(cursorPosition)
            textareaRef.current.focus()
            textareaRef.current.selectionStart = cursorPosition + emoji.length;
            textareaRef.current.selectionEnd = cursorPosition + emoji.length;
        }
    }

    const [emojiOpen, updateEmojiOpen] = useState(false);
    const emojiButtonRef = useRef<HTMLDivElement>(null);
    return (
        <div className={styles.inputRow}>
            <Textarea
                textareaRef={textareaRef}
                onSubmit={onSubmitInner}
                placeholder="Введите сообщение..."
            />
            <EmojiContainer show={emojiOpen} top={emojiButtonRef?.current?.offsetTop || 0} onEmojiSelect={insertEmoji}/>
            <div ref={emojiButtonRef} className={styles.emojiButton}
                 onClick={() => updateEmojiOpen(!emojiOpen)}>&#128512;</div>
            <label className={styles.fileInputContainer}>
                <Attach/>
                <input
                    accept="image/png,image/jpeg"
                    type="file" ref={fileInputRef}
                    multiple
                    onInput={onFileInput}/>
            </label>
            <div className={styles.sendMessageButton}>
                <Button onClick={onSubmitInner}><Send/></Button>
            </div>
        </div>
    )
}

interface EmojiContainerProps {
    top: number;
    onEmojiSelect: (emoji: string) => void;
    show?: boolean
}


function EmojiContainer({top, onEmojiSelect, show}: EmojiContainerProps) {
    const emojiContainerRef = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={emojiContainerRef}
            className={styles.emojiContainer}
            style={{
                top: `${top - (emojiContainerRef?.current?.clientHeight || 0) - 20}px`,
                transform: `scaleY(${show ? 1 : 0})`
            }}

        >
            {emoji.map(e => (
                <span
                    key={e}
                    onClick={() => onEmojiSelect(e)}
                    className={styles.emoji}
                >
                    {codeToEmoji(e)}
                </span>))}
        </div>
    )
}