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
      movies: [],
      error: "",
    };
  }
  async componentDidMount() {
    const allMovies = await getAllMovies();
    console.log(allMovies);
    if (allMovies.ok) {
      let result = await allMovies.json();
      console.log(result.movies);
      this.setState({movies: result.movies});
    } else {
      this.setState({error: allMovies.status});
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
