import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import firebase from "firebase"
import { Image } from "react-bootstrap"
import StarRatingComponent from "react-star-rating-component"
import { AuthContext } from "../App"


const MovieDetail = () => {

    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [rate, setRate] = useState(1)
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
    }, [id])

    const sendRate = () => {
        console.log("Begin method sendRate...");
        let rateText = document.getElementById("rateText").value;
        console.log("rateText : ", rateText);
        if (rateText === "") {
            alert("Must be filled");
        } else {
            console.log("Sending rate...");
            console.log(user)
            const movieRef = firebase.firestore().doc(`/movies/${id}`)
            let review = {
                createdAt: Date.now().toLocaleString("fr"),
                id_user: user,
                message: rateText,
                rate: rate
            }
            //movieRef.collection("/reviews").add(review)
        }
    }

    const hasAlreadyReviewed = async () => {
        const movieRef = firebase.firestore().doc(`/movies/${id}`);
        const reviewRef = await movieRef.collection("/reviews").where("id_user", "==", user.uid).get()
        return reviewRef.empty

    }

    if (!!user) {
        if (hasAlreadyReviewed()) {
            return (
                <div style={loading ? { backgroundColor: "gray", height: "1000px" } : null}>
                    <h1>{movie.title}</h1>
                    <Image src={movie.imageURL} />
                    {loading ? <div className="loader"></div> :
                        ratings.map(rating => {
                            return (
                                <div key={rating.id}>
                                    <StarRatingComponent name="rateMovie" value={rating.rate} />
                                    {rating.message}&nbsp;
                                    {new Date(rating.createdAt.seconds * 1000).toLocaleDateString("fr")}
                                </div>
                            )
                        }
                        )
                    }
                </div>)

        } else {
            return (
                <div style={loading ? { backgroundColor: "gray", height: "1000px" } : null}>
                    <h1>{movie.title}</h1>
                    <Image src={movie.imageURL} />
                    {loading ? <div className="loader"></div> :
                        ratings.map(rating => {
                            return (
                                <div key={rating.id}>
                                    <StarRatingComponent value={rating.rate} />
                                    {rating.message}&nbsp;
                                    {new Date(rating.createdAt.seconds * 1000).toLocaleDateString("fr")}
                                </div>
                            )
                        })
                    }
                    <div>
                        Avis
                    Note : <StarRatingComponent value={rate} onStarHover={(next) => setRate(next)} />
                        <input type="textarea" id="rateText" />
                        <input type="button" value="Noter" onClick={() => { sendRate() }} />
                    </div>
                </div>)
        }
    } else {
        return (
            <div style={loading ? { backgroundColor: "gray", height: "1000px" } : null}>
                <h1>{movie.title}</h1>
                <Image src={movie.imageURL} />
                {loading ? <div className="loader"></div> :
                    ratings.map(rating => {
                        return (
                            <div key={rating.id}>
                                <StarRatingComponent value={rating.rate} />
                                {rating.message}&nbsp;
                                {new Date(rating.createdAt.seconds * 1000).toLocaleDateString("fr")}
                            </div>
                        )
                    })
                }
                <div>
                    Vous devez vous connecter pour pouvoir noter ce film
                </div>
            </div>
        );
    }
}

export default MovieDetail