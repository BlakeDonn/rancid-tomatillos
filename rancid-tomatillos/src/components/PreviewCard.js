import React from "react";

function PreviewCard({movie}) {
    console.log(movie);
    return (
        <div itemID={movie.id}>
            <img height="20px" src={movie.poster_path}></img>
            <h3>{movie.title}</h3>
            <p>{movie.average_rating}</p>
            <p>"Your rating"</p>
            <button></button>
        </div>
    );
}

export default PreviewCard;
