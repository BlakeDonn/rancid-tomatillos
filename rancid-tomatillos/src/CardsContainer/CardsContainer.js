import React from "react";
import PreviewCard from "../Card/PreviewCard";

function CardsContainer(props) {
    console.log(props)
    let pCards
    if (props.movies) {
        pCards = props.movies.map((movie) => <PreviewCard {...movie} />);
    }
    return <div className="container">{pCards}</div>;
}

export default CardsContainer;
