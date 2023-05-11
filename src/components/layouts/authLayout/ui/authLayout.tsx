import React from "react";
import {Avatar, Header, Text} from "@/components/kit";
import {getAuthUser, logout} from "@/storage";
import styles from "../styles/authLayout.module.css";
import {useNavigate} from "react-router-dom";
import {Exit} from "@/components/kit/icons";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
    function onExit() {
        logout();
        navigate("/login");
    }

    const user = getAuthUser();
    const navigate = useNavigate();
    if (!user) return null;

    return (
        <>
            <header className={styles.authHeader}>
                <Header>Local Chat</Header>
                <div className={styles.authHeaderUserBlock}>
                    <Avatar background={user?.color || ""} foreground="#000" letter={user.name[0]}/>
                    <Text>{user.name}</Text>
                    <div className={styles.exitButtonContainer} onClick={onExit}>
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