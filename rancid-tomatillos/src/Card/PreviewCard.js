import React from "react";

function PreviewCard({id, poster_path, title, average_rating}) {
    return (
        <div itemID={id} className="preview-card">
            <img src={poster_path}></img>
            <h3 className="movie-title">{title}</h3>
            <p className="avg-rating">{average_rating}</p>
            <p className="user-rating">"Your rating"</p>
            <button></button>
        </div>
    );

}

export default PreviewCard;
