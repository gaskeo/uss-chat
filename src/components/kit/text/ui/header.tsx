import React from "react";
import styles from "../styles/header.module.css";

export default function Header({children}: React.HTMLProps<HTMLHeadingElement>) {
    return <h1 className={styles.header}>{children}</h1>
}
