import React, {Component} from "react";
import MainView from "./components/MainView";
import CardsContainer from "./components/CardsContainer";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
        };
    }
    getAllMovies() {
        return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
            .then((response) => response.json())
            .then((data) => {
                this.state.movies = data.movies;
            });
    }

    render() {
        this.getAllMovies()
        return (
            <div>
                <MainView />
                <CardsContainer />
            </div>
        );
    }
}

export default App;
