import React, {Component} from "react";
import {getIndividualMovie, getMovieComments, postUserRating,postMovieComments} from "../api";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      error: "",
      movieId: parseInt(props.params.id),
      userRating: "Not yet rated",
      displayedRating: 0,
      userId: typeof props.userId === "number" ? props.userId : null,
      comments: []
    };
  }
  async componentDidMount() {
    let userRating;
    if (this.state.userId) {
      userRating = this.props.userRatings.find(
        (rating) => parseInt(rating.movie_id) === this.state.movieId
        );
        if (userRating) {
          userRating = userRating.rating;
      }
    }
    const response = await getIndividualMovie(this.state.movieId);
    const movie = await response.movie;
    const comments = await this.getMoviePageData()
    console.log(comments)
    this.setState({movie, userRating, comments});
  }
  getMoviePageData = async () => {
    const fetchedComments = await getMovieComments(this.state.movieId)
    return await fetchedComments.comments
    //should be array of comments

  }
  rateMovie = (e) => {
    const rating = parseInt(e.target.value);
    this.setState({displayedRating: rating});
  };
  submitRating = async (e) => {
    e.preventDefault();
    let response = await postUserRating(
      this.state.userId,
      this.state.displayedRating,
      this.state.movie.id
    );
    if (response.error) {
      let userInput = window.confirm(
        "You already have a rating for this movie, would you like to delete it?"
      );
      if (userInput) {
        this.deleteMovie();
      } else {
        this.setState({userRating: this.state.displayedRating});
      }
    } else {
      this.setState({userRating: this.state.displayedRating});
    }

    console.log(response);
  };
  deleteMovie = () => {
    this.props.deleteRating(this.state.movieId);
    this.setState({userRating: "Not yet rated"});
  };
  render() {
    if (this.state.movie === null) {
      return (<p>Loading</p>)
    } else {
      const averageRating = Math.round(this.state.movie.average_rating * 10) / 10
      return (
        <div itemID={this.state.movie.id}>
          <img
            src={this.state.movie.backdrop_path}
            alt={`backdrop of ${this.state.movie.title}`}
          ></img>
          <h3 className="movie-title">{this.state.movie.title}</h3>
          <p className="movie-tagline">{this.state.movie.tagline}</p>
          <p>Summary: {this.state.movie.overview}</p>
          <div>
            <h4>Genres:</h4>
            <ul>
              {this.state.movie.genres.map(genre => (
                <li>{genre}</li>
                ))}
            </ul>
          </div>
          <p>Release Date: {this.state.movie.release_date}</p>
          <p>Runtime: {this.state.movie.runtime} minutes</p>
          <p>Average Rating: {averageRating}</p>
          {this.state.userId ? (
            <div>
              <p className="user-rating">
                {this.state.userRating
                  ? `Your Current Rating ${this.state.userRating}`
                  : "Seen this Movie? Leave a rating!"}
              </p>
              {/*<button onClick={this.deleteMovie}>Delete Rating</button>*/}
              <label>Rating this movie - 1(hate) - 10 (love)</label>
              <input
                onChange={this.rateMovie}
                type="number"
                min="1"
                max="10"
                required="required"
              ></input>
              <button onClick={this.submitRating}>Rate Movie</button>
            </div>
          ) : (
              <p>Log into your account to rate movies</p>
            )}
        </div>
      );
    }
    
  }
}

export default MoviePage;


//TESTING
//1. initial render? does it appear correctly?
//2. do things work as intended? e.g. Login click event (in Login.test.js) - can click -> was fetch request called?
//3. does it return correct value - correct values for