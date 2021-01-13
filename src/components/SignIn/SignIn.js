import React, { useContext } from "react"
import { AuthContext } from "../../App"
import { Redirect } from "react-router-dom"

function SignIn() {

    const { handleLogin, emailError, passwordError, setEmail, setPassword, email, password, user } = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()
        handleLogin(email, password)
    }

    if (user) {
        return <Redirect to="/movies" />
    }

    return (
        <div>
            <h1>Connecte-toi</h1>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                    <label>Adresse e-mail : </label>
                    <input type="email" placeholder="Entre ton email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <label>{emailError}</label>}
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <label>{passwordError}</label>}
                </div>
                <div controlId="formBasicPassword">
                    <label>Si vous n'avez pas de compte, vous pouvez vous en créer un <a href="/signup">ici</a></label>
                </div>
                <input type="submit" value="Valider" />
            </form>
        </div>
    )
}

export default SignIn