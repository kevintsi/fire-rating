import React, {useContext} from "react"
import { Form, Button, Container } from "react-bootstrap"
import {AuthContext} from "../App"
import {Redirect} from "react-router-dom"

function SignIn() {
    
    const {handleLogin, emailError, passwordError, setEmail, setPassword, email, password, user} = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()
        handleLogin(email, password)
    }

    if(user) {
        return <Redirect to="/movies"/>
    }

    return (
        <Container>
            <h1>Connecte-toi</h1>
            <Form method="POST" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adresse e-mail : </Form.Label>
                    <Form.Control type="email" placeholder="Entre ton email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <Form.Text>{emailError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <Form.Text>{passwordError}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Text>Si vous n'avez pas de compte, vous pouvez vous en créer un <a href="/signup">ici</a></Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        </Container>
    )
}

export default SignIn