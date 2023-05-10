import styles from "../styles/dateRow.module.css";
import {getDateDDMMYYYY} from "../../../../utils";
import {Text} from "../../../kit";

interface DateRowProps {
    time: string;
}

export default function DateRow({time}: DateRowProps) {
    const date = new Date(Number(time));
    return (
        <div className={styles.dateRow}>
            <Text color="dominant">{getDateDDMMYYYY(date, date.getFullYear() !== new Date().getFullYear())}</Text>
        </div>
    )
}