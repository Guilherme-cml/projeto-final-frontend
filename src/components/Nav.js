'use client'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PiBooksDuotone } from 'react-icons/pi'

export default function NavBar() {
    const [currentUser, setCurrentUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('currentUser')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
        router.push('/login')
    }

    return (
        <>
        <Navbar style={{ borderRadius: '15px' }} fixed="top" expand="sm" className="bg-body-tertiary m-4">
            <Container>
                <Navbar.Brand as={Link} href="/">
                <PiBooksDuotone size={30}/>
                Clube de Livros
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
         
                
                     <Nav.Link as={Link} href="/books"> 
                        Livros Disponíveis
                    </Nav.Link> 
                

                    {currentUser ? 
                    (<>
                        <Nav.Link className="m-2" as={Link} href="/mybooks"> 
                        Meus Livros
                    </Nav.Link> 
                        <Nav className="ms-auto">

                            <Nav.Link as={Link} href="/user">
                                Olá, {currentUser.username}
                            </Nav.Link>
                            <Nav.Link className="text-danger" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Sair
                            </Nav.Link>
                        
                        </Nav>
                    </>

                    ) : (
                        <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/login">
                            Login
                        </Nav.Link>
                </Nav>
                    )}
            </Container>
        </Navbar>
        <div style={{height: '100px'}}></div>
        </>

    )
}









