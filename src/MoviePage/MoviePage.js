import React, {Component} from "react";
import {getIndividualMovie, getMovieComments, postUserRating} from "../api";
import CommentForm from "../CommentForm/CommentForm";
import {ReactComponent as Tomato} from "../Assets/tomato.svg";
import {ReactComponent as UnTomato} from "../Assets/untomato.svg";
import PropTypes from 'prop-types'
import "./MoviePage.css";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      error: "",
      movieId: parseInt(props.params.id),
      userName: "",
      userRating: "Not yet rated",
      displayedRating: 0,
      userId: typeof props.userId === "number" ? props.userId : null,
      comments: []
    };
  }
  async componentDidMount() {
    let userRating;
    if (this.state.userId) {
      console.log(this.props)
      userRating = this.props.userRatings.find(
        (rating) => parseInt(rating.movie_id) === this.state.movieId
        );
        if (userRating) {
          userRating = userRating.rating;
      }
    }
    const moviePageData = await this.getMoviePageData()
    const movie = moviePageData.details.movie;
    const comments = moviePageData.comments.comments
    const userName = this.props.userName
    this.setState({movie, userRating, comments, userName});
  }
  getMoviePageData = async () => {
    const data = {}
    data.comments = await getMovieComments(this.state.movieId)
    data.details = await getIndividualMovie(this.state.movieId)
    return await data
  }
  determineFavorite = () => {
    if (this.props.favoriteMovies.includes(parseInt(this.state.movieId))) {
      return (
        <Tomato
          onClick={() => this.props.toggleFavorite(this.state.movieId)}
          className={"tomato"}
        />
      );
    } else {
      return (
        <UnTomato
          onClick={() => this.props.toggleFavorite(this.state.movieId)}
          className={"tomato"}
        />
      );
    }
  };
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
        this.props.deleteRating(this.state.movieId);
        this.setState({userRating: "Not yet rated"});
      }
    } else {
      this.setState({userRating: this.state.displayedRating});
    }
  };
  deleteMovie = () => {
    this.props.deleteRating(this.state.movieId);
    this.setState({userRating: "Not yet rated"});
  };
  render() {
    if (this.state.movie === null) {
      return <p>Loading</p>;
    } else {
      const tomatoType = this.determineFavorite()
      const averageRating =
        Math.round(this.state.movie.average_rating * 10) / 10;
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
              {this.state.movie.genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </ul>
          </div>
          <p>Release Date: {this.state.movie.release_date}</p>
          <p>Runtime: {this.state.movie.runtime} minutes</p>
          <p>Average Rating: {averageRating}</p>
          <section className="movie-comments">
            <h4>Comments:</h4>
            {this.state.comments.length > 0 && this.state.comments.map(comment => (
              <section className={comment.id}>
                <h5>{comment.author} says:</h5>
                <p>"{comment.comment}"</p>
              </section>))
            }
          </section>
          
          {this.state.userId ? (
            
            <section className="user-interaction-section">
              <CommentForm userName={this.state.userName} movieId={this.state.movieId} />
              <p className="user-rating">
                {this.state.userRating
                  ? `Your Current Rating ${this.state.userRating}`
                  : "Seen this Movie? Leave a rating!"}
                {this.state.userId && tomatoType}
              </p>
              <label>Rating this movie - 1(hate) - 10 (love)</label>
              <input
                onChange={this.rateMovie}
                type="number"
                min="1"
                max="10"
                required="required"
              ></input>
              <button onClick={this.submitRating}>Rate Movie</button>
            </section>
          ) : (
              <p>Log into your account to rate and comment on movies</p>
            )}

        </div>
      );
    }
  }
}

export default MoviePage;

MoviePage.propTypes = {
  movie: PropTypes.object,
  movieId: PropTypes.number,
  userRating: PropTypes.string,
  displayedRating: PropTypes.number,
  userId: PropTypes.number,
};
