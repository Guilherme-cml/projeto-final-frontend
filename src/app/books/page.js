'use client'
import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner
} from 'react-bootstrap';
import Nav from '@/components/Nav';
import { useRouter } from 'next/navigation';



const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const searchBooks = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="mb-4">Book Catalog</h1>

        <Form onSubmit={handleSearch} className="mb-4">
          <Row>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
              />
            </Col>
            <Col sm={2}>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {books.map((book) => (
              <Col key={book.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
                    alt={book.volumeInfo.title}
                    style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
                  />
                  <Card.Body>
                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">
                      {book.volumeInfo.publishedDate?.split('-')[0]}
                    </Card.Text>
                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => router.push(`/book/${book.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="link"
                        href={book.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Preview
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default BooksPage; 