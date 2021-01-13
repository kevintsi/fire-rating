import React from "react"
import { useHistory } from "react-router-dom";
import "./Movie.css"


const Movie = ({ movie }) => {

    const history = useHistory()

    return (
        <div className="movie-item">
            <h3>{movie.title}</h3>
            <img src={movie.imageURL} style={{ cursor: "pointer" }} alt={movie.title} height="200px" onClick={() => history.push(`/movies/${movie.id}`)} />
        </div>
    )
}

export default Movie