import React, {Component} from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CardsContainer from "../CardsContainer/CardsContainer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import MoviePage from "../MoviePage/MoviePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import PropTypes from "prop-types";
import {
  getAllMovies,
  getUserRatings,
  deleteUserRating,
  getFavoriteMovies,
  postFavorite,
} from "../api";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoriteView: false,
      loggedIn: false,
      userId: 0,
      userEmail: "",
      userName: "",
      userRatings: [],
      movies: [],
      favoriteMovies: [],
      error: "",
    };
  }
  async componentDidMount() {
    const allMovies = await getAllMovies();
    let movies = allMovies.movies;

    if (movies.length) {
      this.setState({movies});
    } else {
      this.setState({error: movies.status});
    }
  }
  toggleLogin = async (data) => {
    const ratings = await getUserRatings(data.id);
    const favoriteMovies = await getFavoriteMovies();
    this.setState({
      loggedIn: !this.state.loggedIn,
      userId: data.id,
      userEmail: data.email,
      userName: data.name,
      userRatings: ratings.ratings,
      favoriteMovies: favoriteMovies,
    });
  };
  toggleFavorite = async (id) => {
    await postFavorite(id);
    const newFavorites = await getFavoriteMovies();
    this.setState({favoriteMovies: newFavorites});
  };
  toggleFavoriteView = () => {
    this.setState({favoriteView: !this.state.favoriteView});
  };
  matchRating = (movieId, userRatings) => {
    let ratingsToSearch = userRatings ? userRatings : this.state.userRatings;
    if (this.loggedIn) {
      return ratingsToSearch.find(
        (rating) => parseInt(rating.movie_id) === parseInt(movieId)
      );
    }
  };
  deleteRating = async (movieId) => {
    let ratedMovie = this.matchRating(movieId);
    if (!ratedMovie) {
      let ratings = await getUserRatings(this.state.userId);
      this.setState({userRatings: ratings.ratings});
      ratedMovie = this.state.userRatings.find(
        (rating) => parseInt(rating.movie_id) === parseInt(movieId)
      );
      deleteUserRating(this.state.userId, ratedMovie.id);
    }
  };
  render() {
    const logged = this.state.loggedIn ? (
      <Redirect to="/" />
    ) : (
        <Login toggleLogin={this.toggleLogin} />
      );
    return (
      <>
        <Header
          toggleFavoriteView={this.toggleFavoriteView}
          toggleLogin={this.toggleLogin}
          loggedIn={this.state.loggedIn}
          favoriteView={this.state.favoriteView}
        />
        <h2>Welcome {this.state.userName}</h2>
        <div className="page-container">
          <Switch>
            <Route
              path="/movie/:id"
              render={({match}) => (
                <MoviePage
                  {...match}
                  userId={this.state.userId}
                  userName={this.state.userName}
                  deleteRating={this.deleteRating}
                  userRatings={this.state.userRatings}
                  toggleFavorite={this.toggleFavorite}
                  favoriteMovies={this.state.favoriteMovies}
                />
              )}
            />
            <Route exact path="/login">
              {logged}
            </Route>
            <Route exact path="/">
              <CardsContainer
                allMovies={this.state.movies}
                userRatings={this.state.userRatings}
                favoriteMovies={this.state.favoriteMovies}
                toggleFavorite={this.toggleFavorite}
                loggedIn={this.state.loggedIn}
                favoriteView={this.state.favoriteView}
              />
            </Route>
            <Route exact path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </>
    );
  }
}

App.propTypes = {
  favoriteView: PropTypes.bool,
  loggedIn: PropTypes.bool,
  favoriteMovies: PropTypes.array,
  movies: PropTypes.array,
  userId: PropTypes.number,
  userRatings: PropTypes.array,
};
export default App;
