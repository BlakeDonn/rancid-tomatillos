import React from "react";
import { Link } from "react-router-dom"

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
    <Link to={`movie/${id}`}
      itemID={id}
      className="preview-card"
    >
      <img src={poster_path} alt={`poster of ${title}`}></img>
      <h3 className="movie-title">{title}</h3>
      <p className="avg-rating">{averageRating}</p>
      <p className="user-rating">
        {userRating ? `Your rating: ${userRating}` : "Click for more details"}{" "}
      </p>
    </Link>
  );
};

export default PreviewCard;
