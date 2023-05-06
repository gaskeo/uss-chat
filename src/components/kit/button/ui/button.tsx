import React from "react";
import styles from "../styles/button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    color?: "success" | "default";
}

export default function Button({children, type, color}: ButtonProps) {
    function getStyle() {
        switch (color) {
            case undefined:
            case "default":
                return {backgroundColor: "#000"};
            case "success":
                return {backgroundColor: "#45f248"};
        }
    }
    return (
        <button className={styles.button} type={type} style={getStyle()}>
            {children}
        </button>
    )
}