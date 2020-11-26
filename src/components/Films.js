import React, { useEffect, useState } from "react"
import firebase from "firebase"

function Films() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await firebase.firestore().collection("movies").get()
                setMovies(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            } catch (error) {
                alert(error.message)
            }
        }
        getMovies()
    }, [])

    return (
        <>
            <h1>Films</h1>
            {
            movies.map(movie => {
                return (              
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <img src={movie.imageURL} alt={movie.title} height="500px"/>
                </div>
                )
            })}
        </>
    )
}

export default Films