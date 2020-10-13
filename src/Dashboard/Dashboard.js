import React from "react";
import CardsContainer from "../CardsContainer/CardsContainer";

function Dashboard(props) {
  return (
    <main>
      <CardsContainer
        history={props.history}
        movies={props.allMovies}
      />
    </main>
  );
}

export default Dashboard;
