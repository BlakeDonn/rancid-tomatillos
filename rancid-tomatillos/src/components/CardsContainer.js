import React from "react";
import PreviewCard from "./PreviewCard";

function CardsContainer(props) {
    console.log(props);
    let pCards
    if (props.allMovies) {
        pCards = props.allMovies.map((movie) => <PreviewCard movie={movie} />);
    }
    return <div className="container">{pCards}</div>;
}

export default CardsContainer;
