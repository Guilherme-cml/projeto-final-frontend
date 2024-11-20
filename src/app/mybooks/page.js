'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';

export default function Page() {
  const [books, setBooks] = useState([]);
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  useEffect(() => {
    const myBooks = JSON.parse(localStorage.getItem(`myBooks-${currentUser.id}`) || '[]');
    setBooks(myBooks);
  }, []);
  
  if (!currentUser) {
    router.push('/login');
    return;
  }
  function removeBook(bookId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedBooks = books.filter(book => book.id !== bookId);
    localStorage.setItem(`myBooks-${currentUser.id}`, JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  return (
    <>
    <Nav></Nav>
    <Container className="py-5">
      <h1 className="mb-4">My Books</h1>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={book.thumbnail }
                alt={book.title}
                style={{ height: '200px', objectFit: 'contain', padding: '5px' }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.authors?.join(', ')}
                </Card.Subtitle>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/book/${book.id}`)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => removeBook(book.id)}
                  >
                    Remover
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {books.length === 0 && (
        <div className="text-center py-5">
          <h3>Você não adicionou nenhum livro ainda</h3>
          <Button 
            variant="primary" 
            onClick={() => router.push('/books')}
            className="mt-3"
          >
            Ver Livros Disponíveis
          </Button>
        </div>
      )}
    </Container>
    </>
  );
} 