import React from "react";

function CardsContainer(props) {
    console.log(props);
    let pCards
    if (props.allMovies) {
        pCards = props.allMovies.map((movie) => <p>{movie.title}</p>);
    }
    return <h1>{pCards}</h1>;
}

export default CardsContainer;
