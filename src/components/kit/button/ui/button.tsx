import React from "react";
import styles from "../styles/button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    color?: "success" | "default";
    onClick?: () => void;
}

export default function Button({onClick, children, type, color}: ButtonProps) {
    function getStyle() {
        switch (color) {
            case undefined:
            case "default":
                return {backgroundColor: "var(--color-dominant)"};
            case "success":
                return {backgroundColor: "var(--color-accent-400)"};
        }
    }

    return (
        <button
            onClick={onClick}
            className={styles.button}
            type={type}
            style={getStyle()}
        >
            {children}
        </button>
    )
}