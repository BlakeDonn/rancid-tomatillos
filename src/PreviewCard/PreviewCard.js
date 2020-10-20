import React, {Component} from "react";
import {Link} from "react-router-dom";

class PreviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      loggedIn: false,
    };
    // const averageRating = Math.round(average_rating * 10) / 10;
  }
  render() {
    return (
      <Link
        to={`movie/${this.props.id}`}
        itemID={this.props.id}
        className="preview-card"
      >
        <img
          src={this.props.poster_path}
          alt={`poster of ${this.props.title}`}
        ></img>
        <h3 className="movie-title">{this.props.title}</h3>
        <p className="avg-rating">{this.props.average_rating}</p>
        <p className="more-details"> "Click for more details"</p>
        <p className="user-rating">
          {this.props.userRating && `Your rating: ${this.props.userRating}`}
        </p>
      </Link>
    );
  }
}
export default PreviewCard;
