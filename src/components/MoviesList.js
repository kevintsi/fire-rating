import React, { useEffect, useState } from "react"
import Movie from "./Movie"
import app from "../firebase"
import { Row, Col } from "react-bootstrap"

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
        <div style={loading ? { backgroundColor: "gray", height: "1000px" } : null}>
            <h1>Films</h1>
            {
                loading ? <div className="loader"></div> :
                    (
                        <Row xs={2} md={5} style={{ overflow: "auto", height: "80vh" }}>
                            {movies.map(movie => {
                                return (
                                    <Col style={{ textAlign: "center" }} key={movie.id}>
                                        <Movie movie={movie} />
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    )
            }
        </div>
    )
}

export default MoviesList