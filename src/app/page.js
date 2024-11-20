'use client'
import { Accordion, Button, Card, Carousel, Col, Container, Navbar, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";







export default function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')) || [])
  }, [])
  return (
    <>
    <Nav></Nav>
    
    <Carousel>
      <Carousel.Item interval={1000}>
        <img style={{width: '1920px', height: '630px', objectFit: 'cover'}}  src="./img/1.jpg" alt="First slide"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img style={{width: '1920px', height: '630px', objectFit: 'cover'}}  src=".\img\2.jpg" alt="First slide"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{width: '1920px', height: '630px', objectFit: 'cover'}}src=".\img\3.jpg" alt="First slide"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    

    <h1 className="text-center my-5">Eventos Disponíveis</h1>
        <Container className="my-5">
        <Row>
          {events.map((product) => (
            <Col key={product.id} md={6} sm={6} className="mb-3">
              <Card className="h-100">
               
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>{product.price}</strong></Card.Text>
                  <Button variant="primary" onClick={() => router.push(`/events`)}>Ver Eventos</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
        

    

   
   
    </>
  );
}
