import React, {Component} from "react";
import MainView from "./components/MainView";
import CardsContainer from "./components/CardsContainer";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: null
        };
    }
    componentDidMount() {
        return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
            .then((response) => response.json())
            .then((data) => {
                this.setState({movies: data.movies});
            });
    }

    render() {
        return (
            <div>
                <MainView />
                <CardsContainer allMovies={this.state.movies} />
            </div>
        );
    }
}

export default App;
