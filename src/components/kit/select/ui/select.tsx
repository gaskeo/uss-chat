import {RefObject} from "react";
import {Text} from "../../text";
import styles from "../styles/select.module.css";

interface SelectProps {
    items: { value: string, label: string }[];
    label: string;
    selectRef: RefObject<HTMLSelectElement>
}

export default function Select({items, label, selectRef}: SelectProps) {
    return (
        <label className={styles.selectContainer}>
            <Text>{label}</Text>
            <select ref={selectRef} className={styles.select}>
                {items.map(item =>
                    <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
        </label>

    )
}