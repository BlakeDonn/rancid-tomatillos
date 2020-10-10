import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import Login from "../Login/Login";
import ShowPage from "../MoviePage/MoviePage";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            movies: [],
            error: "",
        };
    }
    async componentDidMount() {
        let promise = await fetch(
            "https://rancid-tomatillos.herokuapp.com/api/v2/movies/"
        );
        if (promise.ok) {
            let result = await promise.json();
            console.log(result.movies);
            this.setState({movies: result.movies});
        } else {
            this.setState({error: promise.status});
        }
    }
    toggleLogin = (id) => {
        this.setState({loggedIn: !this.state.loggedIn});
    };
    showMovie = (id) => {
        console.log(id)
    }
    render() {
        return (
            <Router>
                <Header
                    toggleLogin={this.toggleLogin}
                    loggedIn={this.state.loggedIn}
                />
                <div className="page-container">
                    <Switch>
                        <Route path="/users">
                            <ShowPage />
                        </Route>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login
                                    {...props}
                                    toggleLogin={this.toggleLogin}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/"
                            render={() =>
                                this.state.error > 400 ? (
                                    <Redirect to="/error" />
                                ) : (
                                        <Dashboard allMovies={this.state.movies} showMovie={this.showMovie}/>
                                    )
                            }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
