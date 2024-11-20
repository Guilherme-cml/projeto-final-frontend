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
import apiBooks from '@/services/apiBooks';
import { v4 } from 'uuid';

export default function Page() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const savedComments = localStorage.getItem(`comments-${id}`);

  useEffect(() => {
    try {
      
      apiBooks.get(`/v1/volumes/${id}`).then(response => {
        setBook(response.data);
      })
    } catch (error) {
      console.error('Erro ao buscar detalhes do livro:', error);
   
    }
  
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }

  }, [id]);

  

  const addToMyBooks = () => {
    if (!currentUser) {
      setMessage({ type: 'danger', text: 'Por favor, faça login para adicionar livros a sua lista' });
      return;
    }

    const myBooks = JSON.parse(localStorage.getItem(`myBooks-${currentUser.id}`) || '[]');
    
    if (myBooks.some(b => b.id === book.id)) {
      setMessage({ type: 'warning', text: 'Este livro já está na sua lista' });
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
    setMessage({ type: 'success', text: 'Livro adicionado a sua lista com sucesso!' });
  };

  function handleComment(e) {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      setMessage({ type: 'danger', text: 'Please login to add comments' });
      return;
    }

    const newComment = {
      id: v4(),
      text: comment,
      userId: currentUser.id,
      username: currentUser.username,
      date: new Date().toISOString()
    };

    const update = [...comments, newComment];
    localStorage.setItem(`comments-${id}`, JSON.stringify(update));
    setComments(update);
    setComment('');

  };
  function deleteComment(commentId) {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };
  
  function editComment(commentId, newText) {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, text: newText };
      }
      return comment;
    });
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
    setEditingCommentId(null);
  };


  return (
    <>
    <Nav />
    <Container className="py-5">
      {message && (
        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
          {message.text}
        </Alert>
      )}

{book && (
        <>

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
                Adicionar aos meus livros
              </Button>
              <Button
                variant="outline-primary"
                className="w-100"
                href={book.volumeInfo.previewLink}
                
              >
                Ver no Google Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <h1>{book.volumeInfo.title}</h1>
          <h5 className="text-muted">
            {book.volumeInfo.authors?.join(', ')}
          </h5>
          <p><strong>Publicado em:</strong> {book.volumeInfo.publishedDate}</p>
          <p><strong>Categorias:</strong> {book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
          <p><strong>Descrição:</strong></p>
          <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
        </Col>
      </Row>
      </>
      )}

      <Row className="mb-5">
        <Col>
          <h3>Comentários</h3>
          <Form onSubmit={handleComment} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva seu comentário..."
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Adicionar Comentário
            </Button>
          </Form>

          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <strong>{comment.username}</strong>
                <p>{comment.text}</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    const newText = prompt('Edit comment:', comment.text);
                    if (newText) editComment(comment.id, newText);
                  }}
                >
                  Editar
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => deleteComment(comment.id)}
                >
                  Deletar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </>
  );
} 