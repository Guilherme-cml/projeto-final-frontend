'use client'
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";

export default function MyEvents() {
    const [myEvents, setMyEvents] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    useEffect(() => {
        // Get all events and user's registered event IDs
        const allEvents = JSON.parse(localStorage.getItem('events')) || [];
        const userEventIds = JSON.parse(localStorage.getItem(`userEvents-${currentUser?.id}`)) || [];
        
        // Filter events to show only the ones user is registered for
        const userEvents = allEvents.filter(event => userEventIds.includes(event.id));
        setMyEvents(userEvents);
    }, []);

    function cancelRegistration(eventId) {
        // Remove event from user's registered events
        const userEventIds = JSON.parse(localStorage.getItem(`userEvents-${currentUser.id}`)) || [];
        const updatedUserEvents = userEventIds.filter(id => id !== eventId);
        localStorage.setItem(`userEvents-${currentUser.id}`, JSON.stringify(updatedUserEvents));
        
        // Update the displayed events
        setMyEvents(myEvents.filter(event => event.id !== eventId));
        alert('Inscrição cancelada com sucesso!');
    }

    return (
        <>
            <Nav />
            <Container className="my-5">
                <h2 className="mb-4">Meus Eventos</h2>
                
                {myEvents.length === 0 ? (
                    <Card className="text-center p-4">
                        <Card.Text>Você ainda não está inscrito em nenhum evento.</Card.Text>
                        <Button href="/events" variant="primary">Ver Eventos Disponíveis</Button>
                    </Card>
                ) : (
                    <Row>
                        {myEvents.map((event) => (
                            <Col key={event.id} md={6} sm={6} className="mt-3 mb-3">
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{event.name}</Card.Title>
                                        <Card.Text>{event.description}</Card.Text>
                                        <Button 
                                            onClick={() => cancelRegistration(event.id)} 
                                            variant="danger"
                                        >
                                            Cancelar Inscrição
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}
