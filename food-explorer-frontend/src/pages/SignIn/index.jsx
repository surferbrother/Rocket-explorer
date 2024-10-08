import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Container, Form, Logo } from "./styles";
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/theme';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loading } = useAuth();

    function handleSignIn() {
        signIn({ email, password });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Container>
                <Logo>
                    <div className="logo">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C" />
                        </svg>
                        <h1>food explorer</h1>
                    </div>
                </Logo>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: -20
                    }}
                    transition={{
                        type: "tween",
                        duration: 0.375,
                    }}
                    style={ {
                        width: "44rem"
                    }}
                >
                    <Form>
                        <h2>Faça login</h2>
                        <div className="inputs">
                            <p>Email</p>
                            <Input
                                placeholder="Exemplo: exemplo@exemplo.com.br"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="inputs">
                            <p>Senha</p>
                            <Input
                                placeholder="No mínimo 6 caracteres"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            title={loading ? "Entrando" : "Entrar"}
                            onClick={handleSignIn}
                            disabled={loading}
                        />

                        <Link to="/register">
                            Ainda não tenho uma conta. Criar agora.
                        </Link>
                    </Form>
                </motion.div>
            </Container>
        </ThemeProvider>
    );
}
