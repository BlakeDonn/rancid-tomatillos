import React from "react";

const PreviewCard = ({history, movie}) => {
  return (
    <div
      itemID={movie.id}
      className="preview-card"
      onClick={() => history.push(`movie/${movie.id}`)}
    >
      <img src={movie.poster_path} alt={`poster of ${movie.title}`}></img>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="avg-rating">{movie.average_rating}</p>
      <p className="user-rating">"Your rating"</p>
    </div>
  );
};

export default PreviewCard;
