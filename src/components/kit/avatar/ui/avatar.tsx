import styles from "../styles/avatar.module.css";

interface AvatarProps {
    background: string;
    foreground: string;
    letter: string;
}

export default function Avatar({background, letter, foreground}: AvatarProps) {
    return (
        <div className={styles.avatar} style={{backgroundColor: background}}>
            <span className={styles.letter} style={{color: foreground}}>{letter}</span>
        </div>
    )
}