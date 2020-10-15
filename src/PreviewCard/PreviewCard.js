import React from "react";

const PreviewCard = ({
  history,
  id,
  poster_path,
  title,
  average_rating,
  userRating,
}) => {
  return (
    <div
      itemID={id}
      className="preview-card"
      role="button"
      onClick={() => history.push(`movie/${id}`)}
    >
      <img src={poster_path} alt={`poster of ${title}`}></img>
      <h3 className="movie-title">{title}</h3>
      <p className="avg-rating">{average_rating}</p>
      <p className="user-rating">
        {userRating ? `Your rating: ${userRating}` : "Click for more details"}{" "}
      </p>
    </div>
  );
};

export default PreviewCard;
