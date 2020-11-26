import React, {useContext} from "react"
import {AuthContext} from "../App"
import {Redirect} from "react-router-dom"

function SignUp() {
    
    const {user} = useContext(AuthContext)

    if(user) {
        return <Redirect to="/movies"/>
    }
    return (
        <h1>SignUp</h1>
    )
}

export default SignUp