import React from "react"
import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap"


const Movie = ({ movie }) => {

    const history = useHistory()

    return (
        <>
            <h3>{movie.title}</h3>
            <Image src={movie.imageURL} style={{ cursor: "pointer" }} alt={movie.title} height="200px" onClick={() => history.push(`/movies/${movie.id}`)} />
        </>
    )
}

export default Movie