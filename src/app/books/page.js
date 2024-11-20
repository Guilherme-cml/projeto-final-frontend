'use client'
import { useState } from 'react';
import { Container,Row,Col,Form,Button,Card} from 'react-bootstrap';
import Nav from '@/components/Nav';
import apiBooks from '@/services/apiBooks';
import { useRouter } from 'next/navigation';



export default function Page() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter()
  

  function searchBooks(query) {
    try {
      
      apiBooks.get(`/v1/volumes/?q=${query}&maxResults=20`).then(response => {
        setBooks(response.data.items || []);
      })
    } catch (error) {
      console.error('Error f:', error);
   
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooks(query);
    }
  };

  return (
    <>
      <Nav />

      <Container className="py-5">
        <h1 className="mb-4">Catálogo de Livros</h1>

        <Form onSubmit={handleSearch} className="mb-4">
          <Row>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar livros..."
              />
            </Col>
            <Col sm={2}>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
              >
                Buscar
              </Button>
            </Col>
          </Row>
        </Form>

       
          <Row xs={1} md={2} lg={3} className="g-4">
            {books.map((book) => (
              <Col key={book.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    style={{ height: '200px', objectFit: 'contain', padding: '5px' }}
                  />
                  <Card.Body>
                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.volumeInfo.authors?.join(', ')}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">
                      {book.volumeInfo.publishedDate?.split('-')[0]}
                    </Card.Text>
                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => router.push(`/book/${book.id}`)}
                      >
                        Detalhes
                      </Button>
                      <Button
                        variant="link"
                        href={book.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visualizar no Google Books
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
};

