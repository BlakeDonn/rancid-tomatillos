import React from "react";

const PreviewCard = ({id, poster_path, title, average_rating, showMovie}) => {
    console.log(this)
    return (
        <div itemID={id} className="preview-card">
            <img src={poster_path} alt={`poster of ${title}`} onClick={showMovie}></img>
            <h3 className="movie-title">{title}</h3>
            <p className="avg-rating">{average_rating}</p>
            <p className="user-rating">"Your rating"</p>
        </div>
    );

}

export default PreviewCard;
