import React from "react";
import PreviewCard from "./PreviewCard";

function CardsContainer(props) {
    console.log(props);
    let pCards
    if (props.allMovies) {
        pCards = props.allMovies.map((movie) => <PreviewCard movie={movie} />);
    }
    return <h1>{pCards}</h1>;
}

export default CardsContainer;
