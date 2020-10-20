import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CardsContainer from "../CardsContainer/CardsContainer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import MoviePage from "../MoviePage/MoviePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  getAllMovies,
  getUserRatings,
  deleteUserRating,
} from "../api";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: 0,
      userEmail: "",
      userName: "",
      userRatings: [],
      movies: [],
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
    let ratings = await getUserRatings(data.id);
    this.setState({
      loggedIn: !this.state.loggedIn,
      userId: data.id,
      userEmail: data.email,
      userName: data.name,
      userRatings: ratings.ratings,
    });
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
    console.log(ratedMovie)
    if (!ratedMovie) {
      let ratings = await getUserRatings(this.state.userId);
      console.log(ratings)
      this.setState({userRatings: ratings.ratings});
      ratedMovie = this.state.userRatings.find(
        (rating) => parseInt(rating.movie_id) == parseInt(movieId)
      );
      deleteUserRating(this.state.userId, ratedMovie.id)
    }
  };
  render() {
    const logged = this.state.loggedIn ? (
      <Redirect to="/" />
    ) : ( <Login toggleLogin={this.toggleLogin} />
    )
    return (
      <>
        <Header toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn} />
        <h2>Welcome {this.state.userName}</h2>
        <div className="page-container">
          <Switch>
            <Route
              path="/movie/:id"
              render={({match}) => (
                <MoviePage
                  {...match}
                  userId={this.state.userId}
                  deleteRating={this.deleteRating}
                  userRatings={this.state.userRatings}
                />
              )}
              h
            />
            <Route exact path="/login">{logged}</Route>
            <Route exact path="/">
              <CardsContainer
                allMovies={this.state.movies}
                userRatings={this.state.userRatings}
                update={this.componentDidUpdate} />
            </Route>
            <Route exact path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
