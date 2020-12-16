import React, {useContext} from "react"
import {AuthContext} from "../App"
import {Redirect} from "react-router-dom"
import {auth} from "../firebase"
import {Form, Container, Button} from "react-bootstrap"

function SignUp() {
    
    const {user,setVerifyPassword,verifyPassword,setVerifyPasswordError,verifyPasswordError,passwordError, emailError, email, password, setEmail, setPassword, } = useContext(AuthContext)

    if(user) {
        return <Redirect to="/movies"/>
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if(password != verifyPassword){
            setVerifyPasswordError("Passwords doesn't match")
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password)
            return <Redirect to="/signin"/>
        } catch (error) {
          console.log(error)  
        }
    }
    return (
        <Container>
            <h1>Inscription</h1>
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
                <Form.Group controlId="formBasicVerifyPassword">
                    <Form.Label>Confirmer votre mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Confirmer votre mot de passe" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                </Form.Group>
                {verifyPasswordError && <Form.Text>{verifyPasswordError}</Form.Text>}
                <Form.Group controlId="formBasicPassword">
                    <Form.Text>Si vous avez un compte, vous pouvez vous connecter <a href="/signin">ici</a></Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        </Container>
    )
}

export default SignUp