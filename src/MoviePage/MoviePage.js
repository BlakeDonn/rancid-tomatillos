import React, {Component} from "react";
import {getIndividualMovie} from "../api";

class MoviePage extends Component {
  constructor(props) {
    super();
    this.state = {
      movie: {},
      error: "",
      movieId: props.params.id,
    };
  }
  async componentDidMount() {
    const response = await getIndividualMovie(this.state.movieId);
    console.log(response)
    const movie = await response.movie;
    this.setState({movie});
  }
  rateMovie() {

  }
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
        <p>{this.state.movie.tagline}</p>
        <p className="user-rating">"Your rating"</p>
        <label>Rating this movie - 1(hate) - 10 (love)</label>
        <input type="number" min="1" max="10" required="required"></input>
        <button onClick={this.rateMovie}>Rate Movie</button>
      </div>
    );
  }
}

export default MoviePage;
