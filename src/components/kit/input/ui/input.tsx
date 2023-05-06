import {Text} from "../../../kit";
import {RefObject} from "react";
import styles from "../styles/input.module.css";

interface InputProps {
    value?: string;
    inputRef?: RefObject<HTMLInputElement>;
    label?: string;
    type?: "text" | "password"
}

export default function Input({value, inputRef, label, type}: InputProps) {
    return (
        <label className={styles.inputContainer}>
            {label && <Text>{label}</Text>}
            <input className={styles.input} ref={inputRef} defaultValue={value} type={type}/>
        </label>
    )
}