import React from "react";

const PreviewCard = ({history, id, poster_path, title, average_rating}) => {
  return (
    <div
      itemID={id}
      className="preview-card"
      onClick={() => history.push(`movie/${id}`)}
    >
      <img src={poster_path} alt={`poster of ${title}`}></img>
      <h3 className="movie-title">{title}</h3>
      <p className="avg-rating">{average_rating}</p>
      <p className="user-rating">"Your rating"</p>
    </div>
  );
};

export default PreviewCard;
