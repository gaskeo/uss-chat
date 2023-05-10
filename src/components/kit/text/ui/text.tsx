import React from "react";
import styles from "../styles/text.module.css";

interface TextProps {
    children: React.ReactNode;
    color?: "dominant" | "secondary" | "link" | "accent" | "invert"
    size?: "s" | "m" | "l";
    pre?: boolean;
}

export default function Text({size, children, color, pre}: TextProps) {
    function getColor() {
        switch (color) {
            case undefined:
            case "dominant":
                return {color: "var(--color-secondary-1000)"};
            case "secondary":
                return {color: "var(--color-secondary-800)"};
            case "link":
                return {color: "var(--color-accent-100)"}
            case "accent":
                return {color: "var(--color-accent-700)"}
            case "invert":
                return {color: "var(--color-dominant)"}
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

    function getPre(): {whiteSpace: "pre"} | {} {
        if (pre) {
            return {whiteSpace: "pre-wrap"};
        }
        return {};
    }
    return <p className={styles.text} style={{...getColor(), ...getSize(), ...getPre()}}>{children}</p>
}