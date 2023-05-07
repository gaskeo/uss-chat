import React from "react";
import {Header, Text} from "../../../kit";
import {getAuthUser} from "../../../../storage";
import styles from "../styles/authLayout.module.css";
import {logout} from "../../../../storage/auth/logout";
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
                    <div className={styles.avatar}>{user?.name[0]}</div>
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