import React from "react";
import PreviewCard from "../PreviewCard/PreviewCard";

function CardsContainer(props) {
  let pCards = props.movies.map((movie) => {
    let ratedMovie =  props.userRatings.find(x => x.movie_id === movie.id)
    if (ratedMovie) {
      movie.userRating = ratedMovie.rating
    }
    return (
      <PreviewCard
        history={props.history}
        {...movie}
      />
    );
  });

  return <div className="container">{pCards}</div>;
}

export default CardsContainer;
