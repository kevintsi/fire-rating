import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import firebase from "firebase"
import { Image } from "react-bootstrap"
import StarRatingComponent from "react-star-rating-component"
import { AuthContext } from "../App"


const MovieDetail = () => {

    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [movie, setMovie] = useState({})
    const [ratings, setRatings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMovieAndRatings = async () => {
            try {
                setLoading(true)
                const movieRef = firebase.firestore().doc(`/movies/${id}`)
                const movieDoc = await movieRef.get()
                console.log(movieDoc.data())
                setMovie({ ...movieDoc.data(), id: id })
                const ratingRef = await movieRef.collection("/reviews").get()
                const ratingDocs = await ratingRef.docs
                console.log(ratingDocs.map(doc => console.log(doc.data())))
                setRatings(ratingDocs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            } catch (error) {
                alert(error.message)
            }
        }
        getMovieAndRatings()
    }, [])

    return (
        <div style={loading ? { backgroundColor: "gray", height: "1000px" } : null}>
            <h1>{movie.title}</h1>
            <Image src={movie.imageURL} />
            {loading ? <div className="loader"></div> :
                ratings.map(rating => {
                    return (
                        <div key={rating.id}>
                            <StarRatingComponent starCount={5} value={rating.rate} />
                            {rating.message}
                        </div>
                    )
                })
            }

            <div>
                Avis
                Note : <StarRatingComponent starCount={5} />
                <input type="textarea" disabled={!(!!user)} />
                <input type="submit" value="Noter" disabled={!(!!user)} />
            </div>
        </div>
    )


}

export default MovieDetail