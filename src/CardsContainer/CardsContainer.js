import React from "react";
import PreviewCard from "../PreviewCard/PreviewCard";

function CardsContainer(props) {
  let ratedMovie;
  let pCards = props.movies.map((movie) => {
    if (props.userRatings) {
      ratedMovie = props.userRatings.find((x) => x.movie_id === movie.id);
    }
    if (ratedMovie) {
      movie.userRating = ratedMovie.rating;
    }
    return <PreviewCard history={props.history} {...movie} />;
  });

  return <div className="container">{pCards}</div>;
}

export default CardsContainer;
