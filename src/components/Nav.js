
import { Formik } from "formik"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { PiBooksDuotone } from "react-icons/pi"

export default function Page() {


    return (

<>
        <Container >
            <Navbar style={{ borderRadius: '15px' }} fixed="top" expand="sm" className="bg-body-tertiary m-4">
                <Container>
                    <Navbar.Brand href="/">
                        <PiBooksDuotone size={30}/> Clube de Livros</Navbar.Brand>
                    {/* <Nav.Link href="/cadastro">Cadastro</Nav.Link> */}
                    <Button className="justify-content-end" href="/login" variant="outline-success">Login</Button>
                </Container>
            </Navbar>
        </Container>
        <div style={{height: '100px'}}></div>





</>
    )
}




