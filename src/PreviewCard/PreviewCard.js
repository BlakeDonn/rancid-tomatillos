import React, {Component} from "react";


class PreviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      loggedIn: false,
    };
  }
  render() {
    return (
      <div
        itemID={this.props.id}
        className="preview-card"
        role="button"
        onClick={() => this.props.history.push(`movie/${this.props.id}`)}
      >
        <img src={this.props.poster_path} alt={`poster of ${this.props.title}`}></img>
        <h3 className="movie-title">{this.props.title}</h3>
        <p className="avg-rating">{this.props.average_rating}</p>
        <p className="user-rating">
          {this.props.userRating ? `Your rating: ${this.props.userRating}` : "Click for more details"}{" "}
        </p>
      </div>
    );
  }
}
export default PreviewCard;
