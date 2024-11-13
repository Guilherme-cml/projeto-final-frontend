





'use client'

import { Button, Card, Container } from "react-bootstrap"
import Nav from "../../components/Nav"


export default function Page() {

    return (
        <>
        <Nav >
        </Nav>
        <Container>

<Card>
<Card.Header as="h5">Meu Perfil

</Card.Header>
<Card.Body>
  <Card.Title>Special title treatment</Card.Title>
  <Card.Text>
    Table
  </Card.Text>
  <Button variant="primary">Meus Livros</Button>
</Card.Body>
</Card>
        </Container>

        </>
    )

}
