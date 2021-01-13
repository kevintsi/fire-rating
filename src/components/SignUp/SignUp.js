import React, { useContext } from "react"
import { AuthContext } from "../../App"
import { Redirect } from "react-router-dom"
import { auth } from "../../firebase"

function SignUp() {

    const { user, setVerifyPassword, verifyPassword, setVerifyPasswordError, verifyPasswordError, passwordError, emailError, email, password, setEmail, setPassword, } = useContext(AuthContext)

    if (user) {
        return <Redirect to="/movies" />
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== verifyPassword) {
            setVerifyPasswordError("Passwords doesn't match")
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password)
            return <Redirect to="/signin" />
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Inscription</h1>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                    <label>Adresse e-mail : </label>
                    <input type="email" placeholder="Entre ton email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <label>{emailError}</label>}
                </div>

                <div controlId="formBasicPassword">
                    <label>Mot de passe</label>
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <label>{passwordError}</label>}
                </div>
                <div controlId="formBasicVerifyPassword">
                    <label>Confirmer votre mot de passe</label>
                    <input type="password" placeholder="Confirmer votre mot de passe" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                </div>
                {verifyPasswordError && <label>{verifyPasswordError}</label>}
                <div>
                    <label>Si vous avez un compte, vous pouvez vous connecter <a href="/signin">ici</a></label>
                </div>
                <input type="submit" value="Valider" />
            </form>
        </div>
    )
}

export default SignUp