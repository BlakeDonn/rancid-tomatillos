import React from "react";
let movie;
function MoviePage(props) {
  let id = props.location.pathname.split("/")[2];
  const constMovieFetch = async () => {
    let promise = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    movie = await promise.json()
    props.history.push(`/movie`)
  }
  if (props.match.isExact) {
    return <h1>{movie.movie.title}</h1>
  }
  else {
    constMovieFetch()
    return <h1>Loading</h1>;
  }


}

export default MoviePage;
