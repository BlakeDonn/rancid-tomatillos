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
import MoviePage from "../MoviePage/MoviePage";
import {getAllMovies} from "../api";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: 0,
      movies: [],
      error: "",
    };
  }
  async componentDidMount() {
    const allMovies = await getAllMovies();
    let movies = allMovies.movies
    if (movies.length) {
      this.setState({movies});
    } else {
      this.setState({error: movies.status});
    }
  }
  toggleLogin = (id) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userId: id
      });
    console.log(this.state)
  };

  render() {
    return (
      <Router>
        <Header toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn} />
        <div className="page-container">
          <Switch>
            <Route
              path="/movie/:id"
              render={({match}) => <MoviePage {...match} />}
            />
            <Route
              path="/login"
              render={(props) =>
                this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                    <Login {...props} toggleLogin={this.toggleLogin} />
                  )
              }
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
