import React, {Component} from "react";
import MainView from "./components/MainView";
import {Route} from "react-router-dom";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: null
        };
    }
    async componentDidMount() {
        let promise = await fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
        let result = await promise.json()
        this.setState({movies: result.movies});
    }

    render() {
        return (
            <div>
                <MainView allMovies={this.state.movies} />
            </div>
        );
    }
}

export default App;
