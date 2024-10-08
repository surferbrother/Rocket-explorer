import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Container, Form, Logo } from "./styles";
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/theme';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    function handleSignUp() {
        if (!name || !email || !password) toast.error("Preencha todos os campos!");
        setLoading(true);
        api.post("/users", { name, email, password })
            .then(() => {
                toast.error("Usuário cadastrado com sucesso!");
                navigate(-1);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    toast.error("Não foi possível cadastrar");
                }

                setLoading(false)
            });
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
                    style={{
                        width: "44rem"
                    }}
                >
                    <Form>
                        <h2>Crie sua conta</h2>
                        <div className="inputs">
                            <p>Seu nome</p>
                            <Input
                                placeholder="Exemplo: Maria da Silva"
                                type="text"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
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
                            title={loading ? "Cadastrando" : "Criar conta"}
                            onClick={handleSignUp}
                            disabled={loading}
                        />
                        <Link onClick={handleBack}>
                            Já sou cadastrado. Fazer login.
                        </Link>
                    </Form>
                </motion.div>
            </Container>
        </ThemeProvider>
    );
}
