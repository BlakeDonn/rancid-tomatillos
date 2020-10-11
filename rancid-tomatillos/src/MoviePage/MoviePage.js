import React from "react";

function MoviePage(props) {
  console.log(props)
  let id = props.location.pathname.split("/")[2];
  fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then((response) => response.json())
    .then((movie) => console.log(movie));
  return <h1>hi</h1>;
}

export default MoviePage;
