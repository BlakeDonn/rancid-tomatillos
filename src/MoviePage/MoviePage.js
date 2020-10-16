import React, {Component} from "react";
import {getIndividualMovie, postUserRating} from "../api";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      movie: {},
      error: "",
      movieId: props.params.id,
      userRating: "Not yet rated",
      userId: typeof props.userId === "number" ? props.userId : null,
    };
  }
  async componentDidMount() {
    const response = await getIndividualMovie(this.state.movieId);
    const movie = await response.movie;
    this.setState({movie});
  }
  async componentDidUpdate() {
    console.log(this.state.userId);
  }
  rateMovie = (e) => {
    const rating = parseInt(e.target.value);
    this.setState({userRating: rating});
    console.log(this);
  };
  submitRating = async (e) => {
    e.preventDefault();
    let response = await postUserRating(
      this.state.userId,
      this.state.userRating,
      this.state.movie.id
    );
    if (response.error) {
      let userInput = window.confirm("You allready have a rating for this movie, would you like to delete it?")
      if (userInput) {
        this.deleteMovie()
      }
    }
  };
  deleteMovie = () => {
    console.log(this.state.movieId);
    this.props.deleteRating(this.state.movieId);
    this.setState({userRating: "Not yet rated"});
  };
  render() {
    return (
      <div itemID={this.state.movie.id}>
        <img
          src={this.state.movie.backdrop_path}
          alt={`backdrop of ${this.state.movie.title}`}
        ></img>
        <h3 className="movie-title">{this.state.movie.title}</h3>
        <p>{this.state.movie.average_rating}</p>
        <p>{this.state.movie.budget}</p>
        <p>{this.state.movie.genres}</p>
        <p>{this.state.movie.overview}</p>
        <p>{this.state.movie.release_date}</p>
        <p>{this.state.movie.revenue}</p>
        <p>{this.state.movie.runtime} minutes</p>
        <p>{this.state.movie.tagline}</p>
        {this.state.userId ? (
          <div>
            <p className="user-rating">
              {this.state.userRating
                ? "Seen this Movie? Leave a rating!"
                : this.state.userRating}
              }
            </p>
            <button onClick={this.deleteMovie}>Delete Rating</button>
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
        ) : null}
      </div>
    );
  }
}

export default MoviePage;
