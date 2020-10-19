import React from "react";

const PreviewCard = ({
  history,
  id,
  poster_path,
  title,
  average_rating,
  userRating,
}) => {
  const averageRating = Math.round(average_rating * 10) / 10
  return (
    <div
      itemID={id}
      className="preview-card"
      tabIndex="0"
      role="button"
      onClick={() => history.push(`movie/${id}`)}
      onKeyPress={() => history.push(`movie/${id}`)}
    >
      <img src={poster_path} alt={`poster of ${title}`}></img>
      <h3 className="movie-title">{title}</h3>
      <p className="avg-rating">{averageRating}</p>
      <p className="user-rating">
        {userRating ? `Your rating: ${userRating}` : "Click for more details"}{" "}
      </p>
    </div>
  );
};

export default PreviewCard;
