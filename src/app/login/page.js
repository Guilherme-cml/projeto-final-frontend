'use client'
import { Formik } from "formik";
import Nav from "../../components/Nav";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mask } from "remask";
import { v4 } from "uuid";
import CadastroValidator from "@/validators/CadastroValidator";

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

    const initialValues = { id: '', email: '', password: '', confirmPassword: '' , name: '', username: '', birdthdate: '', cpf: ''};
   

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

        const newUser = { id: v4(), email: values.email, password: values.password , name: values.name, username: values.username, birdthdate: values.birdthdate, cpf: values.cpf};
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
                <Card>
                <Card.Header as="h5" className="text-center">{isRegistering ? 'Cadastro' : 'Login'}</Card.Header>
                    <Card.Body>

            <Formik
    initialValues={initialValues}
    validationSchema={CadastroValidator}
    onSubmit={values => isRegistering ? handleRegister(values) : handleLogin(values)}
>
    {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        errors
    }) => (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                    placeholder="Seu Email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                    placeholder="Sua Senha"
                />
            </Form.Group>

            {/* Campos adicionais para registro, quando isRegistering for true */}
            {isRegistering && (
                <>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Repita a Senha</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={errors.confirmPassword}
                            placeholder="Confirme a Senha"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={errors.name}
                            placeholder="Seu Nome"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={errors.username}
                            placeholder="Username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            name="cpf"
                            value={values.cpf}
                            placeholder="000.000.000-00"
                            isInvalid={errors.cpf}
                            onChange={(value)=>{
                                setFieldValue('cpf', mask(value.target.value, '999.999.999-99'))
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="text"
                            name="birdthdate"
                            value={values.birdthdate}
                            isInvalid={errors.birdthdate}
                            placeholder="00/00/0000"
                            onChange={(value)=>{
                                setFieldValue('birdthdate', mask(value.target.value, '99/99/9999'))
                            }}
                        />
                    </Form.Group>
                </>
            )}

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
                    </Card.Body>

                </Card>




            </Container>
        </>
    );
}
