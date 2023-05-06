import React from "react";
import styles from "../styles/text.module.css";

interface TextProps {
    children: React.ReactNode;
    type?: "dominant" | "secondary"
}

export default function Text({children, type}: TextProps) {
    function getStyle() {
        switch (type) {
            case undefined:
            case "dominant":
                return {color: "#000"};
            case "secondary":
                return {color: "#454545"};
        }
    }
    return <p className={styles.text} style={getStyle()}>{children}</p>
}