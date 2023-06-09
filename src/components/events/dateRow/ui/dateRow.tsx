import styles from "../styles/dateRow.module.css";
import {getDateDDMMYYYY} from "src/utils";
import {Text} from "src/components/kit";

interface DateRowProps {
    timestamp: string;
}

export default function DateRow({timestamp}: DateRowProps) {
    const date = new Date(Number(timestamp));
    const isThisYear = date.getFullYear() === new Date().getFullYear();
    const dateDDMMYYYY = getDateDDMMYYYY(date, !isThisYear)
    return (
        <div className={styles.dateRowContainer}>
            <Text color="dominant">{dateDDMMYYYY}</Text>
        </div>
    )
}