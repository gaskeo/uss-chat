import styles from "../styles/avatar.module.css";

export interface AvatarProps {
    background: string;
    foreground: string;
    letter?: string;
}

export default function Avatar({background, letter, foreground}: AvatarProps) {
    if (!letter) letter = "";
    return (
        <div className={styles.avatar} style={{backgroundColor: background}}>
            <span className={styles.letter} style={{color: foreground}}>{letter.toUpperCase()}</span>
        </div>
    )
}