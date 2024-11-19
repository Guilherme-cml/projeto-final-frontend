'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Alert
} from 'react-bootstrap';
import Nav from '@/components/Nav';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBookDetails();
    loadComments();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = () => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments-${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  };

  const addToMyBooks = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      setMessage({ type: 'danger', text: 'Please login to add books to your list' });
      return;
    }

    const myBooks = JSON.parse(localStorage.getItem(`myBooks-${currentUser.id}`) || '[]');
    
    if (myBooks.some(b => b.id === book.id)) {
      setMessage({ type: 'warning', text: 'This book is already in your list' });
      return;
    }

    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      addedAt: new Date().toISOString()
    };

    localStorage.setItem(`myBooks-${currentUser.id}`, JSON.stringify([...myBooks, newBook]));
    setMessage({ type: 'success', text: 'Book added to your list successfully!' });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      setMessage({ type: 'danger', text: 'Please login to add comments' });
      return;
    }

    const newComment = {
      id: Date.now(),
      text: comment,
      userId: currentUser.id,
      username: currentUser.username,
      date: new Date().toISOString()
    };

    const updatedComments = [...comments, newComment];
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
    setComment('');
  };

  if (loading) return <Container className="py-5"><div>Loading...</div></Container>;
  if (!book) return <Container className="py-5"><div>Book not found</div></Container>;

  return (
    <>
    <Nav />
    <Container className="py-5">
      {message && (
        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
          {message.text}
        </Alert>
      )}

      <Row className="mb-5">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
              alt={book.volumeInfo.title}
              style={{ height: '300px', objectFit: 'contain', padding: '1rem' }}
            />
            <Card.Body>
              <Button variant="primary" className="w-100 mb-2" onClick={addToMyBooks}>
                Add to My Books
              </Button>
              <Button
                variant="outline-primary"
                className="w-100"
                href={book.volumeInfo.previewLink}
                target="_blank"
              >
                Preview on Google Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <h1>{book.volumeInfo.title}</h1>
          <h5 className="text-muted">
            {book.volumeInfo.authors?.join(', ')}
          </h5>
          <p><strong>Published:</strong> {book.volumeInfo.publishedDate}</p>
          <p><strong>Categories:</strong> {book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
          <p><strong>Description:</strong></p>
          <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3>Comments</h3>
          <Form onSubmit={handleCommentSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Comment
            </Button>
          </Form>

          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <div className="d-flex justify-content-between">
                  <strong>{comment.username}</strong>
                  <small className="text-muted">
                    {new Date(comment.date).toLocaleDateString()}
                  </small>
                </div>
                <p className="mb-0">{comment.text}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </>
  );
} 