import styles from "../styles/dateRow.module.css";

interface DateRowProps {
    time: string;
}

export default function DateRow({time}: DateRowProps) {
    return (
        <div className={styles.dateRow}>
            {new Date(Number(time)).toLocaleDateString("ru-RU")}
        </div>
    )
}