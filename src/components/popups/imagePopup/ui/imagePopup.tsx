import styles from "../styles/imagePopup.module.css";
import React from "react";

interface ImagePopupProps {
    src: string;
    onClose: () => void;
}

export default function ImagePopup({src, onClose}: ImagePopupProps) {
    return (
        <>
            <div className={styles.background} onClick={onClose}/>

            <div className={styles.imagePopupContainer}>
                <img alt="" src={src}/>
            </div>
        </>
    )
}
