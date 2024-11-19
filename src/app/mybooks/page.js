'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const myBooks = JSON.parse(localStorage.getItem(`myBooks-${currentUser.id}`) || '[]');
    setBooks(myBooks);
  }, []);

  const removeBook = (bookId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedBooks = books.filter(book => book.id !== bookId);
    localStorage.setItem(`myBooks-${currentUser.id}`, JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Books</h1>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={book.thumbnail || '/placeholder-book.png'}
                alt={book.title}
                style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.authors?.join(', ') || 'Unknown Author'}
                </Card.Subtitle>
                <Card.Text className="text-muted">
                  Added: {new Date(book.addedAt).toLocaleDateString()}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/books/${book.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => removeBook(book.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {books.length === 0 && (
        <div className="text-center py-5">
          <h3>You haven't added any books yet</h3>
          <Button 
            variant="primary" 
            onClick={() => router.push('/books')}
            className="mt-3"
          >
            Browse Books
          </Button>
        </div>
      )}
    </Container>
  );
} 