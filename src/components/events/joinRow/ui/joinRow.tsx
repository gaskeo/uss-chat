import styles from "../styles/joinRow.module.css";
import {Text} from "../../../kit";

interface JoinRowProps {
    username: string;
    name: string;
    time: string;
}

export default function JoinRow({time, name}: JoinRowProps) {
    return (
        <div className={styles.joinRowContainer}>
            <Text type="secondary">{new Date(Number(time)).toLocaleString("ru-RU")}</Text>
            <Text>{name} присоединился к комнате</Text>
        </div>
    )
}