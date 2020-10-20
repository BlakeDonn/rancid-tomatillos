import React from "react";
import {Link} from "react-router-dom";
import {ReactComponent as Tomato} from "../Assets/tomato.svg";

const PreviewCard = (props) => {
  const average = Math.round(props.average_rating * 10) / 10;
  const favorite = props.favoriteMovies.includes(props.id)
    ? <Tomato />
    : null;
  return (
    <div itemID={props.id} className="preview-card">
      <img src={props.poster_path} alt={`poster of ${props.title}`}></img>
      <h3 className="movie-title">{props.title}</h3>
      {favorite}
      <p className="avg-rating">Average Rating: {average}</p>
      <p className="user-rating">
        {props.logged && props.userRating && `your rating: ${props.userRating}`}
      </p>
      <Link to={`movie/${props.id}`} className="more-details">
        Click for more details
      </Link>
    </div>
  );
};
export default PreviewCard;
