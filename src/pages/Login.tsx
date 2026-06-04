import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");
    const navigate = useNavigate();
    usePageTitle("Login");
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    function handleLoginClick(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (email && password) login(email, password);
    }
    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleLoginClick}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
}
