import React from "react";
import PreviewCard from "../Card/PreviewCard";

function CardsContainer(props) {
  let pCards = props.movies.map((movie) => {
    return (
      <PreviewCard
        history={props.history}
        movie={movie}
      />
    );
  });

  return <div className="container">{pCards}</div>;
}

export default CardsContainer;
