import React, { useEffect, useState } from "react"
import Movie from "../Movie/Movie"
import app from "../../firebase"
import "./MovieList.css"

const MoviesList = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            console.log("Start fetchData....")
            setLoading(true)
            try {
                const data = await app.firestore().collection("movies").get()
                setMovies(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            } catch (error) {
                alert(error.message)
            }
            setLoading(false)
            console.log("End fetchData....")
        }

        fetchData()
    }, [])

    return (
        <div className="container" style={loading ? { height: "1000px" } : null}>
            <div className="container-films"><h1>Films</h1></div>
            {
                loading ? <div className="loader"></div> :
                    (
                        <div className="container-movies-list">
                            {movies.map(movie => <Movie movie={movie} />)
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default MoviesList