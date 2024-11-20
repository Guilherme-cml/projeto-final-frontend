'use client'
import { Button, Card, Carousel, Col, Container, Navbar, Row } from "react-bootstrap";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";



export default function Home() {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userEvents = JSON.parse(localStorage.getItem(`userEvents-${currentUser.id}`) || '[]');

    useEffect(() => {
        setEvents(JSON.parse(localStorage.getItem('events')) || [])
    }, [])

    function addEvent(eventId) {
        if (!currentUser) {
            setMessage({ type: 'danger', text: 'Faça login para se inscrever em um evento' });
            return;
        }
        if (userEvents.includes(eventId)) {
            alert('Você já está inscrito neste evento');
            return;
        }

        userEvents.push(eventId);
        localStorage.setItem(`userEvents-${currentUser.id}`, JSON.stringify(userEvents));
        alert('Inscrição realizada com sucesso!');
    }
    function removeEvent(eventId) {
        if (!currentUser) {
            setMessage({ type: 'danger', text: 'Faça login para remover um evento' });
            return;
        }

        const updatedEvents = events.filter(event => event.id !== eventId);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvents(updatedEvents);

        // Remove from user events if they were registered
        const updatedUserEvents = userEvents.filter(id => id !== eventId);
        localStorage.setItem(`userEvents-${currentUser.id}`, JSON.stringify(updatedUserEvents));

        alert('Evento removido com sucesso!');
    }


    return (
        <>
            <Nav></Nav>


            <Container className="my-5">
                <Card className="h-100">


                    <Card.Body>
                        <Card.Title>Cadastrar Novo Evento</Card.Title>
                        <Card.Text>Crie um novo evento para compartilhar com os outros usuários</Card.Text>
                        <Button href={'/events/[id]'} variant="primary">Cadastrar</Button>
                    </Card.Body>
                </Card>


                <Row>
                    {events.map((event) => (
                        <Col key={event.id} md={6} sm={6} className="mt-3 mb-3">
                            <Card className="h-100">

                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text>{event.description}</Card.Text>
                                    <div className="d-flex gap-2">
                                        <Button onClick={() => addEvent(event.id)} variant="primary">
                                            Ingressar
                                        </Button>
                                                <Button href={`/events/${event.id}`} variant="warning">
                                                    Editar
                                                </Button>
                                                <Button onClick={() => removeEvent(event.id)} variant="danger">
                                                    Remover
                                                </Button>
                                          
                                        
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    );
}
