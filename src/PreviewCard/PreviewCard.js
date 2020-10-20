import React from "react";
import {Link} from "react-router-dom";

const PreviewCard = (props) => {
  console.log(props);
  return (
    <Link to={`movie/${props.id}`} itemID={props.id} className="preview-card">
      <img src={props.poster_path} alt={`poster of ${props.title}`}></img>
      <h3 className="movie-title">{props.title}</h3>
      <p className="avg-rating">{Math.round(props.average_rating * 10) / 10}</p>
      <p className="more-details"> "Click for more details"</p>
      <p className="user-rating">
        {props.logged && props.userRating && `your rating: ${props.userRating}`}
      </p>
    </Link>
  );
};
export default PreviewCard;
