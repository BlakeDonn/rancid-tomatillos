import React, {Component} from "react";
import MainView from "./components/MainView";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: null,
        };
    }
    async componentDidMount() {
        let promise = await fetch(
            "https://rancid-tomatillos.herokuapp.com/api/v2/movies"
        );
        let result = await promise.json();
        this.setState({movies: result.movies});
    }

    render() {
        return (
            <Router>
                <Header />
                <div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <MainView allMovies={this.state.movies} />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
