import React, {useContext} from "react"
import {Navbar, Nav} from "react-bootstrap"
import {AuthContext} from "../App"

function NavBar() {
    const {user, handleLogout} = useContext(AuthContext)

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/movies">FireRating</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/movies">Films</Nav.Link>
                <Nav.Link href="/animes">Animes</Nav.Link>
                <Nav.Link href="/mangas">Mangas</Nav.Link>
                {!!user ?<Nav.Link onClick={() => handleLogout()}>Se déconnecter </Nav.Link> : <Nav.Link href="/signin">Se connecter</Nav.Link> }
            </Nav>
        </Navbar>
    )
}

export default NavBar