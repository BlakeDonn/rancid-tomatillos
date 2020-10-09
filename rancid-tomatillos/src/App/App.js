import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import MainView from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Login from "./Login/Login";
import ShowPage from "./MoviePage/MoviePage";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            movies: null,
            userId: 0,
        };
    }
    async componentDidMount() {
        let promise = await fetch(
            "https://rancid-tomatillos.herokuapp.com/api/v2/movies"
        );
        let result = await promise.json();
        this.setState({movies: result.movies});
    }
    toggleLogin = () => {
        this.setState({loggedIn: !this.state.loggedIn});
    };

    render() {
        return (
            <Router>
                <Header isAuthed={this.toggleLogin} loggedIn={this.state.loggedIn} />
                <div className="page-container">
                    <Switch>
                        <Route path="/users">
                            <ShowPage />
                        </Route>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} isAuthed={this.toggleLogin} />
                            )}
                        />
                        <Route isAuthed={true} path="/">
                            <MainView allMovies={this.state.movies} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
