import React from "react";

function PreviewCard({movie}) {
    return (
        <div itemID={movie.id} className="preview-card">
            <img src={movie.poster_path}></img>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="avg-rating">{movie.average_rating}</p>
            <p className="user-rating">"Your rating"</p>
            <button></button>
        </div>
    );
}

export default PreviewCard;
