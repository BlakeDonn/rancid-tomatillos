import React, {Component} from "react";
import {getIndividualMovie} from "../api";

class MoviePage extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      movie: [],
      error: "",
      movieId: props.params.id,
    };
  }
  async componentDidMount() {
    const response = await getIndividualMovie(this.state.movieId);
    const movies = await response.movies;
    this.setState({movies});
  }
  render() {
    return (
      <div itemID={this.state.movie.id}>
        <img
          src={this.state.movie.backdrop_path}
          alt={`backdrop of ${this.state.movie.title}`}
        ></img>
        <h3 className="movie-title">{this.state.movie.title}</h3>
        <p className="avg-rating">{this.state.movie.average_rating}</p>
        <p className="avg-rating">{this.state.movie.budget}</p>
        <p className="avg-rating">{this.state.movie.genres}</p>
        <p className="avg-rating">{this.state.movie.overview}</p>
        <p className="avg-rating">{this.state.movie.release_date}</p>
        <p className="avg-rating">{this.state.movie.revenue}</p>
        <p className="avg-rating">{this.state.movie.runtime} minutes</p>
        <p className="avg-rating">{this.state.movie.tagline}</p>
        <p className="avg-rating">{this.state.movie.tagline}</p>
        <p className="user-rating">"Your rating"</p>
      </div>
    );
  }
}

export default MoviePage;
