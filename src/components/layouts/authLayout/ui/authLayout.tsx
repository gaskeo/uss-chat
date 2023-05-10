import React from "react";
import {Avatar, Header, Text} from "../../../kit";
import {getAuthUser, logout} from "../../../../storage";
import styles from "../styles/authLayout.module.css";
import {useNavigate} from "react-router-dom";
import {Exit} from "../../../kit/icons";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
    const user = getAuthUser();
    const navigate = useNavigate();
    return (
        <>
            <header className={styles.header}>
                <Header>Local Chat</Header>
                <div className={styles.userContainer}>
                    <Avatar background={user?.color || ""} foreground="#000" letter={user?.name[0] || ""}/>
                    <Text>{user?.name}</Text>
                    <div className={styles.exit} onClick={() => {
                        logout();
                        navigate("/login");
                    }}>
                        <Exit/>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}