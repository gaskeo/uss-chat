import {Text} from "../../../kit";
import React, {RefObject} from "react";
import styles from "../styles/textarea.module.css";

interface TextareaProps {
    value?: string;
    inputRef: RefObject<HTMLTextAreaElement>;
    label?: string;
    onSubmit?: () => void
}

export default function Textarea({value, inputRef, label, onSubmit}: TextareaProps) {
    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit && onSubmit();
            if (inputRef?.current) inputRef.current.style.height = "0";
        }
    }
    return (
        <label className={styles.inputContainer}>
            {label && <Text>{label}</Text>}
            <textarea
                onKeyDown={onEnterPress}
                className={styles.input}
                ref={inputRef}
                defaultValue={value}
                onSubmit={()=> console.log(13)}
                onInput={() => {
                    if (inputRef?.current) {
                        inputRef.current.style.height = "0";
                        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
                    }
                }}
            />
        </label>
    )
}