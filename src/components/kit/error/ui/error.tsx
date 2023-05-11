import styles from "../styles/error.module.css";
import {Text} from "../../text";

interface ErrorProps {
    message: string;
}

function Error({message}: ErrorProps) {
    return (
        <div className={styles.error}>
            <Text>{message}</Text>
        </div>
    )
}

export default Error;
