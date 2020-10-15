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
import {getAllMovies, getUserRatings, postUserRating, deleteUserRating} from "../api";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: 0,
      userRatings: [],
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
  toggleLogin = async (id) => {
    let ratings = await getUserRatings(id)
    this.setState({
      loggedIn: !this.state.loggedIn,
      userId: id,
      userRatings: ratings.ratings
      });
  };
  submitRating = async (e) => {
    e.preventDefault()
    console.log(this.state.userId)
    const postRating = await postUserRating(this.state.userId, this.state.userRating, this.state.movie.id)
    console.log(postRating)
  }
  deleteRating = async (e) => {
    e.preventDefault()
    const ratedMovie = this.props.userRatings.find(rating => rating.movie_id === this.state.movie.id)
    console.log(this.props.userRatings, this.state.movie.id)
    await deleteUserRating(this.state.userId, ratedMovie.id)
  }
  render() {
    return (
      <Router>
        <Header toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn} />
        <div className="page-container">
          <Switch>
            <Route
              path="/movie/:id"
              render={({match}) => <MoviePage {...match} rateMovie={this.rateMovie} submitRating={this.submitRating} deleteRating={this.deleteRating}/>}
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
                    <Dashboard {...props} allMovies={this.state.movies} userRatings={this.state.userRatings} />
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
