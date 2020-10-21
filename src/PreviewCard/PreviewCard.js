import React from "react";
import "./PreviewCard.css";
import {Link} from "react-router-dom";
import {ReactComponent as Tomato} from "../Assets/tomato.svg";
import {ReactComponent as UnTomato} from "../Assets/untomato.svg";

const PreviewCard = (props) => {
  const average = Math.round(props.average_rating * 10) / 10;
  const favorite = props.favoriteMovies.includes(props.id) ? (
    <Tomato
      onClick={() => props.toggleFavorite(props.id)}
      className={"tomato"}
    />
  ) : (
      <UnTomato
        onClick={() => props.toggleFavorite(props.id)}
        className={"tomato"}
      />
    );
  return (
    <div itemID={props.id} className="preview-card">
      <img src={props.poster_path} alt={`poster of ${props.title}`}></img>
      {props.logged && favorite}
      <h3 className="movie-title">{props.title}</h3>
      <p className="avg-rating">Average Rating: {average}</p>
      <p className="user-rating">
        {props.logged && props.userRating && `your rating: ${props.userRating}`}
      </p>
      <Link to={`movie/${props.id}`} className="more-details">
        Click for details on {props.title}
      </Link>
    </div>
  );
};
export default PreviewCard;
