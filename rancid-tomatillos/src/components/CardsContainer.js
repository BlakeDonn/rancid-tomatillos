import React from "react";
import PreviewCard from "./PreviewCard";

function CardsContainer(props) {
    let pCards
    if (props.movies) {
        pCards = props.movies.map((movie) => <PreviewCard movie={movie} />);
    }
    return <div className="container">{pCards}</div>;
}

export default CardsContainer;
