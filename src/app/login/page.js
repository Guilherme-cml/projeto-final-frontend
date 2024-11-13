'use client'
import { Formik } from "formik";
import Nav from "../../components/Nav";
import { Button, Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);



    // useEffect(() => {
        
    //     }
    // , []);

    // Exemplo de usuários pré-registrados para teste de login
    const registeredUsers = [
        { id: 1, email: '1@1', password: '1' },
        { id: 2, email: 'usuario2@example.com', password: 'senha456' },
    ];

    const initialValues = { id: '', email: '', password: '', confirmPassword: '' };

    function handleLogin(values) {
        const user = registeredUsers.find(
            (user) => user.email === values.email && user.password === values.password
        );

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            alert("Login realizado com sucesso!");
            router.push('/user');
        } else {
            alert("Email ou senha incorretos!");
        }
    }

    function handleRegister(values) {
        if (values.password !== values.confirmPassword) {
            alert("As senhas não correspondem!");
            return;
        }

        const newUser = { id: Date.now(), email: values.email, password: values.password };
        registeredUsers.push(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        alert("Cadastro realizado com sucesso!");
        setIsRegistering(false);
        router.push('/');
    }

    return (
        <>
            <Nav />

            <Container>

            {isRegistering && 
                               
                               
                               

                <Formik
                    initialValues={initialValues}
                    onSubmit={values => isRegistering ? handleRegister(values) : handleLogin(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </Form.Group>
                           

                            <Button variant="primary" type="submit">
                                {isRegistering ? "Cadastrar" : "Entrar"}
                            </Button>
                            
                            <Button
                                variant="link"
                                onClick={() => setIsRegistering(!isRegistering)}
                            >
                                {isRegistering ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
                            </Button>
                        </Form>
                    )}
                
                </Formik>
                            }
                            <Formik
                    initialValues={initialValues}
                    onSubmit={values => isRegistering ? handleRegister(values) : handleLogin(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>teste</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </Form.Group>
                           

                            <Button variant="primary" type="submit">
                                {isRegistering ? "Cadastrar" : "Entrar"}
                            </Button>
                            
                            <Button
                                variant="link"
                                onClick={() => setIsRegistering(!isRegistering)}
                            >
                                {isRegistering ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
                            </Button>
                        </Form>
                    )}
                </Formik>


            </Container>
        </>
    );
}
