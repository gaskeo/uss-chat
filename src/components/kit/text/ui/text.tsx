import React from "react";
import styles from "../styles/text.module.css";

interface TextProps {
    children: React.ReactNode;
    color?: "dominant" | "secondary" | "link" | "accent" | "invert"
    size?: "s" | "m" | "l"
}

export default function Text({size, children, color}: TextProps) {
    function getColor() {
        switch (color) {
            case undefined:
            case "dominant":
                return {color: "#000"};
            case "secondary":
                return {color: "#999"};
            case "link":
                return {color: "#5196ba"}
            case "accent":
                return {color: "#f5a55b"}
            case "invert":
                return {color: "#fff"}
        }
    }

    function getSize() {
        switch (size) {
            case undefined:
            case "m":
                return {fontSize: "16px"};
            case "l":
                return {fontSize: "20px"};
            case "s":
                return {fontSize: "14px"}
        }
    }
    return <p className={styles.text} style={{...getColor(), ...getSize()}}>{children}</p>
}