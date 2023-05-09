import React from "react";
import {Avatar, Header, Text} from "../../../kit";
import {getAuthUser, logout} from "../../../../storage";
import styles from "../styles/authLayout.module.css";
import {useNavigate} from "react-router-dom";

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
                    <Avatar background="#343434" foreground="#000" letter={user?.name[0] || ""}/>
                    <Text>{user?.name} |</Text>
                    <span onClick={() => {
                        logout();
                        navigate("/login");
                    }}>
                        <Text color="link">Выход</Text>
                    </span>
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}