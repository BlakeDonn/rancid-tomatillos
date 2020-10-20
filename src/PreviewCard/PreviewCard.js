import React from "react";
import {Link} from "react-router-dom";

const PreviewCard = (props) => {
  const average = Math.round(props.average_rating * 10) / 10
  const favorite = props.favoriteMovies.includes(props.id) ? "One of your favorites" : null
  return (
    <Link to={`movie/${props.id}`} itemID={props.id} className="preview-card">
      <img src={props.poster_path} alt={`poster of ${props.title}`}></img>
      <h3 className="movie-title">{props.title}</h3>
      <p className="avg-rating">{average}</p>
      <p className="more-details"> "Click for more details"</p>
      <p className="user-rating">
        {props.logged && props.userRating && `your rating: ${props.userRating}`}
      </p>
      <p className="favorite-status" >{favorite}</p>
    </Link>
  );
};
export default PreviewCard;
