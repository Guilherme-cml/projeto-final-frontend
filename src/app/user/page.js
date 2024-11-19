'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import Nav from '../../components/Nav'

export default function UserPage() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser')
        if (!currentUser) {
            router.push('/login')
            return
        }
        setUser(JSON.parse(currentUser))
    }, [router])

    const handleEdit = () => {
        router.push('/user/edit')
    }

    if (!user) {
        return null
    }

    return (
        <>
            <Nav />
            
                <h2 className="text-center mb-4">Perfil do Usuário</h2>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="primary" onClick={handleEdit}>
                                Editar Perfil
                            </Button>
                        </div>
                        <Row className="g-4">
                            <Col md={6}>
                                <Card className="h-100">
                                    <Card.Header className="bg-primary text-white">
                                        <h5 className="mb-0">Informações Pessoais</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <p><strong>Nome:</strong> {user.name}</p>
                                        <p><strong>Username:</strong> {user.username}</p>
                                        <p><strong>Data de Nascimento:</strong> {user.birthdate}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="h-100">
                                    <Card.Header className="bg-primary text-white">
                                        <h5 className="mb-0">Informações de Contato</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>CPF:</strong> {user.cpf}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            

            {/* <style jsx global>{`
                .card {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .card-header h5 {
                    margin-bottom: 0;
                }
                p:last-child {
                    margin-bottom: 0;
                }
            `}</style> */}
        </>
    )
}
