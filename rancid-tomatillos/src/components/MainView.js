import React from "react";
import CardsContainer from "./CardsContainer";

function MainView(props) {
    return (
        <main>
            <CardsContainer movies={props.allMovies} />
        </main>
    );
}

export default MainView;
