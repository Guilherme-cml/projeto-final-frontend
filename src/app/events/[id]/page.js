'use client'
import { use } from 'react'
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask, unmask } from "remask";
import { v4 } from "uuid";
import EventValidator from "@/validators/EventValidator";
import Nav from "@/components/Nav";

export default function Page({ params }) {

    const route = useRouter()
    const unwrappedParams = use(params)
    const events = JSON.parse(localStorage.getItem('events')) || []
    const dados = events.find(item => item.id == unwrappedParams.id)
    const event = dados || { name: '', decription: '', local: '', date: '' }

    function salvar(dados) {

        if (event.id) {
            Object.assign(event, dados)
        } else {
            dados.id = v4()
            events.push(dados)
        }

        localStorage.setItem('events', JSON.stringify(events))
        return route.push('/events')
    }

    return (
        <>
        <Nav></Nav>
        <Container>

            <Formik
                initialValues={event}
                validationSchema={EventValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => {
                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange('name')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange('description')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="local">
                                <Form.Label>Local</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="local"
                                    value={values.local}
                                    onChange={handleChange('local')}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="date"
                                    value={values.date}
                                    onChange={(value)=>{
                                        setFieldValue('date', mask(value.target.value, '99/99/9999'))
                                    }}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/passageiros"
                                    className="btn btn-danger ms-2"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
        </>
    )
}
