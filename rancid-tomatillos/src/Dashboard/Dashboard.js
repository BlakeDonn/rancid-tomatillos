import React from "react";
import CardsContainer from "../CardsContainer/CardsContainer";

function Dashboard(props) {
    console.log(props)
    return (
        <main>
            <CardsContainer movies={props.allMovies} showMovie={props.showMovie} />
        </main>
    );
}

export default Dashboard;
