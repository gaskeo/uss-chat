import styles from "../styles/joinRow.module.css";
import {Text} from "src/components/kit";
import {getTimeHHMM} from "src/utils";

interface JoinRowProps {
    username: string;
    name: string;
    time: string;
}

export default function JoinRow({time, name}: JoinRowProps) {
    const timeHHMM = getTimeHHMM(new Date(Number(time)));
    return (
        <div className={styles.joinRowContainer}>
            <Text color="secondary">{timeHHMM}</Text>
            <Text>{name} присоединился к комнате</Text>
        </div>
    )
}