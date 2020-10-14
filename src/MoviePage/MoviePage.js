import React, {Component} from "react";
import {getIndividualMovie} from "../api";

class MoviePage extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      movie: {},
      error: "",
      movieId: props.params.id,
    };
  }
  async componentDidMount() {
    const response = await getIndividualMovie(this.state.movieId);
    this.setState({movie: response.movie});
  }
  render() {
    return (
      <h1> hi</h1>
    )
  }
}

export default MoviePage;
