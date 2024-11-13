'use client'
import { Button, Card, Carousel, Col, Container, Navbar, Row } from "react-bootstrap";
import { PiBooksDuotone } from "react-icons/pi";
import Nav from "../components/Nav";

const products = [
  {
    id: 1,
    name: 'Produto 1',
    description: 'Descrição do produto 1',
    price: 'R$ 100,00',
    image: '/img/a-book-1991816_640.jpg'
  },
  {
    id: 2,
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 'R$ 200,00',
    image: '/img/a-book-3346785_640.png'
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do produto 3',
    price: 'R$ 300,00',
    image: '/img/notes-2656005_640.jpg'
  },
  {
    id: 4,
    name: 'Produto 4',
    description: 'Descrição do produto 4',
    price: 'R$ 400,00',
    image: '/img/produto4.jpg'
  },
  {
    id: 5,
    name: 'Produto 5',
    description: 'Descrição do produto 5',
    price: 'R$ 500,00',
    image: '/img/produto5.jpg'
  },
  {
    id: 6,
    name: 'Produto 6',
    description: 'Descrição do produto 6',
    price: 'R$ 600,00',
    image: '/img/produto6.jpg'
  }, 
  {
    id: 7,
    name: 'Produto 7',
    description: 'Descrição do produto 7',
    price: 'R$ 700,00',
    image: '/img/produto7.jpg'},
  {
    id: 8,
    name: 'Produto 8',
    description: 'Descrição do produto 8',
    price: 'R$ 800,00',
    image: '/img/produto8.jpg'
  }
  // Adicione mais produtos conforme necessário
];





export default function Home() {
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
    

      <Container className="my-5">
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>{product.price}</strong></Card.Text>
                  <Button variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
   
    </>
  );
}
