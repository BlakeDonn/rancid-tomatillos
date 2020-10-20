import React from "react";
import PreviewCard from "../PreviewCard/PreviewCard";

function CardsContainer(props) {
  let ratedMovie;
  let previewCards = props.allMovies.map((movie) => {
    if (props.userRatings) {
      ratedMovie = props.userRatings.find((x) => x.movie_id === movie.id);
    }
    if (ratedMovie) {
      movie.userRating = ratedMovie.rating;
    }
    return <PreviewCard history={props.history} {...movie} />;
  });

  return <div className="container">
    {previewCards}</div>;
}

export default CardsContainer;


//replace dashboard with cardscontainer (delete one--redundant)