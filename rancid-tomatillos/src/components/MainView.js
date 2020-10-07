import React from "react";
import Header from "./Header";
import CardsContainer from "./CardsContainer";

function MainView(props) {
    return (
        <main>
            <Header />
            <CardsContainer movies={props.allMovies} />
        </main>
    );
}

export default MainView;
