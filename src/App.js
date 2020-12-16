import React, { createContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "./components/Nav";
import Routes from "./components/Routes";
import { auth } from "./firebase"

export const AuthContext = createContext();

function App() {

  var [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();


  const handleLogin = async (email, password) => {
    try {
      user = await auth.signInWithEmailAndPassword(email, password)
      setUser(user)
      history.push("/movies")
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message)
          break;
        case "auth/wrong-password":
          setPasswordError(error.message)
          break;
      }
    }
  }

  const handleLogout = () => {
    auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    const handleAuth = () => {
      auth.onAuthStateChanged(setUser)
    }
    handleAuth()
  }, [])

  return (
    <AuthContext.Provider value={{
      email,
      setEmail,
      password,
      setPassword,
      emailError,
      passwordError,
      handleLogin,
      verifyPassword,
      setVerifyPassword,
      handleLogout,
      verifyPasswordError,
      setVerifyPasswordError,
      user
    }}>
      <Container fluid={true}>
        <NavBar />
        <Routes />
      </Container>
    </AuthContext.Provider>
  );
}

export default App;
