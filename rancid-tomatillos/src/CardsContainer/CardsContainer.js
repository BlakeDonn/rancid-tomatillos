import React from "react";
import PreviewCard from "../Card/PreviewCard";

function CardsContainer(props) {
    let pCards = props.movies.map((movie) => {
        console.log(props)
    return <PreviewCard movie={movie} showMovie={props.showMovie} />;
    })
  
    return <div className="container">{pCards}</div>;
}

export default CardsContainer;
