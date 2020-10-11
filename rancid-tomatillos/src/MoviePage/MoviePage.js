import React from "react";
let movie;
function MoviePage(props) {
  console.log(props)
  let id = props.location.pathname.split("/")[2];
  const constMovieFetch = async () => {
    let promise = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    movie = await promise.json()
    props.history.push({
      pathname: "/movie",
      state: {
        movie: movie.movie
      },
    });

  }
  if (props.match.isExact) {
    const {id, title, poster_path, backdrop_path, release_date} = props.location.state.movie
    return (
      <div
        itemID={id}>
        <h1>{title}</h1>
        <img src={backdrop_path} alt={`${title} background`} />
        <h1>{title}</h1>
      </div>
    )
  }
  else {
    constMovieFetch()
    return <h1>Loading</h1>;
  }


}

export default MoviePage;
