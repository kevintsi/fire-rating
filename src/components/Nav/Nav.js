import React, { useContext } from "react"
import { AuthContext } from "../../App"
import "./Nav.css"

/**
 * Navbar function displays the navigation bar
 */
function NavBar() {
    const { user, handleLogout } = useContext(AuthContext)

    return (
        <ul className="nav-container">
            <li className="nav-item"><a href="/movies">FireRating</a></li>
            <li className="nav-item"><a href="/movies">Films</a></li>
            <li className="nav-item"><a href="/animes">Animes</a></li>
            <li className="nav-item"><a href="/mangas">Mangas</a></li>
            {user ? <li className="nav-item" onClick={() => handleLogout()}>Se déconnecter </li> : <li className="nav-item"><a href="/signin">Se connecter</a></li>}
        </ul>
    )
}

export default NavBar