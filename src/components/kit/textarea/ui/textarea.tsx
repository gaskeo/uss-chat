import {Text} from "../../../kit";
import React, {RefObject} from "react";
import styles from "../styles/textarea.module.css";

interface TextareaProps {
    defaultValue?: string;
    textareaRef: RefObject<HTMLTextAreaElement>;
    label?: string;
    onSubmit?: () => void;
    placeholder?: string;
}

export default function Textarea({defaultValue, placeholder, textareaRef, label, onSubmit}: TextareaProps) {
    function checkSubmit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit && onSubmit();
            if (textareaRef?.current) textareaRef.current.style.height = "0";
        }
    }

    function minimizeHeight() {
        if (textareaRef?.current) {
            textareaRef.current.style.height = "0";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    return (
        <label className={styles.textareaContainer}>
            {label && <Text>{label}</Text>}
            <textarea
                placeholder={placeholder}
                onKeyDown={checkSubmit}
                className={styles.textarea}
                ref={textareaRef}
                defaultValue={defaultValue}
                onInput={minimizeHeight}
            />
        </label>
    )
}