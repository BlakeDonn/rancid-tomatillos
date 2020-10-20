import React from "react";
import PreviewCard from "../PreviewCard/PreviewCard";

function CardsContainer(props) {
  let ratedMovie;
  let moviesToDisplay;
  if (props.favoriteView) {
    moviesToDisplay = props.allMovies.filter(movie => props.favoriteMovies.includes(movie.id))
  } else {
    moviesToDisplay = props.allMovies
  }
  let previewCards = moviesToDisplay.map((movie) => {
    if (props.userRatings) {
      ratedMovie = props.userRatings.find((x) => x.movie_id === movie.id);
    }
    if (ratedMovie) {
      movie.userRating = ratedMovie.rating;
    }
    return (
      <PreviewCard
        {...movie}
        toggleFavorite={props.toggleFavorite}
        favoriteMovies={props.favoriteMovies}
        logged={props.loggedIn}
      />
    );
  });

  return <div className="container">{previewCards}</div>;
}

export default CardsContainer;
