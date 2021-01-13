import React, { useState, useEffect } from "react"
import StarRatingComponent from "react-star-rating-component"

export default function RatingItem({ user_id, rating }) {
    console.log(user_id)
    if (user_id === rating.id_user) {
        return (
            <div>
                <input type="textarea" value={rating.message} />
            </div>
        )
    } else {
        return (
            <div>
                <StarRatingComponent name="rateMovie" value={rating.rate} />
                {rating.message}&nbsp;
                {new Date(rating.createdAt.seconds * 1000).toLocaleDateString("fr")}
            </div>
        )
    }
}