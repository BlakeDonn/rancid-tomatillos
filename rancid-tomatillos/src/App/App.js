import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import Login from "../Login/Login";
import MoviePage from "../MoviePage/MoviePage";

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

  render() {
    return (
      <Router>
        <Header toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn} />
        <div className="page-container">
          <Switch>
            <Route path="/movie" render={(props) => <MoviePage {...props} useMe={{}} />} />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} toggleLogin={this.toggleLogin} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) =>
                this.state.error > 400 ? (
                  <Redirect to="/error" />
                ) : (
                    <Dashboard {...props} allMovies={this.state.movies} />
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
