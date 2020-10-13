import React from "react";
import { getIndividualMovie } from '../api';

function MoviePage(props) {
  let id = props.location.pathname.split("/")[2];

  if (props.match.isExact) {
    console.log(props);
    const {
      average_rating,
      backdrop_path,
      budget,
      genres,
      id,
      overview,
      poster_path,
      release_date,
      revenue,
      runtime,
      tagline,
      title,
    } = props.location.state.movie;
    return (
      <div itemID={id} onMouseOver={console.log(overview)}>
        <h1 className="movie-title">{title}</h1>
        <img src={backdrop_path} alt={`${title} background`} />
        <p className="average-rating"> Average user rating: {average_rating}</p>
        <p className="genres"> {genres}</p>
        <p className="release-date"> {release_date}</p>
        <p className="revenue">{revenue ? revenue : "Not released"}</p>
        <p className="runtime"> {runtime} minutes</p>
        {budget && <p className="budget">{budget}</p>}
        {tagline && <p className="tagline"> {tagline}</p>}
      </div>
    );
  } else {
    getIndividualMovie(id, props);
    return <h1>Loading</h1>;
  }
}

export default MoviePage;
