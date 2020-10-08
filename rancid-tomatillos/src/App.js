import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import MainView from "./components/MainView";
import Header from "./components/Header";
import Login from "./components/Login";
import ShowPage from "./components/ShowPage";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.setLoggedIn = this.setLoggedIn.bind(this);
        this.state = {
            movies: null,
            userId: 0,
            loggedIn: false,
        };
    }
    async componentDidMount() {
        let promise = await fetch(
            "https://rancid-tomatillos.herokuapp.com/api/v2/movies"
        );
        let result = await promise.json();
        this.setState({movies: result.movies});
    }
    setLoggedIn() {
        this.setState({loggedIn: true});
    }

    render() {
        return (
            <Router>
                <Header />
                <div className="page-container">
                    <Switch>
                        <Route path="/users">
                            <ShowPage />
                        </Route>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} isAuthed={this.setLoggedIn} />
                            )}
                        />
                        <Route isAuthed={false} path="/">
                            <MainView allMovies={this.state.movies} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
